import { createOpenAI } from "npm:@ai-sdk/openai";
import { streamText, type ModelMessage } from "npm:ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  getLovableAiGatewayResponseHeaders,
} from "../_shared/run-id.ts";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";
const MAX_IMAGES = 3;
const MAX_IMAGE_CHARS = 2_800_000; // ~2MB base64
const ALLOWED_MIME = /^data:image\/(jpeg|png|webp);base64,/;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};

const SYSTEM = `You are an experienced plant pathologist supporting smallholder farmers in East Africa (especially Somalia).
Given crop photos and/or a symptom description, give a PRELIMINARY assessment only.
Reply in clear, simple English using Markdown with exactly these sections:
## Likely possibilities
A numbered list of 1-3 possible causes (disease, pest, nutrient deficiency or abiotic stress). For each: name, likelihood (High/Medium/Low), and the visible signs that support it.
## What to check next
Short bullet points the farmer can check in the field to confirm.
## Practical management
Bullet points: immediate steps, cultural practices, and IPM-friendly options. Mention chemical options only generically (active ingredient class), always advising to follow label instructions and local regulations.
## When to get expert help
One or two sentences.
Be honest when photos are unclear or information is insufficient. Keep the whole answer under 400 words. If the input is not about plants or crops, say politely that you can only help with crop health.`;

const json = (body: unknown, status: number, extra?: HeadersInit) =>
  new Response(JSON.stringify(body), {
    status,
    headers: getLovableAiGatewayResponseHeaders(extra, {
      ...corsHeaders,
      "Content-Type": "application/json",
    }),
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "AI is not configured." }, 500);

  let body: { crop?: unknown; symptoms?: unknown; images?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const crop = typeof body.crop === "string" ? body.crop.trim().slice(0, 100) : "";
  const symptoms = typeof body.symptoms === "string" ? body.symptoms.trim().slice(0, 2000) : "";
  const images = Array.isArray(body.images) ? body.images : [];

  if (images.length > MAX_IMAGES) return json({ error: `Up to ${MAX_IMAGES} photos allowed.` }, 400);
  for (const img of images) {
    if (typeof img !== "string" || !ALLOWED_MIME.test(img) || img.length > MAX_IMAGE_CHARS) {
      return json({ error: "Photos must be JPG, PNG or WEBP and under 2 MB each." }, 400);
    }
  }
  if (!symptoms && images.length === 0) {
    return json({ error: "Please add a photo or describe the symptoms." }, 400);
  }

  const text = `Crop: ${crop || "not specified"}\nSymptoms described by the farmer: ${symptoms || "none provided — rely on the photos"}`;
  const messages: ModelMessage[] = [
    {
      role: "user",
      content: [
        { type: "text", text },
        ...images.map((img) => ({ type: "image" as const, image: new URL(img as string) })),
      ],
    },
  ];

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(req));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  let upstreamError: unknown = null;
  const result = streamText({
    model: provider.responses(MODEL),
    system: SYSTEM,
    messages,
    abortSignal: req.signal,
    onError: ({ error }) => {
      upstreamError = error;
    },
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  let answer = "";
  try {
    for await (const chunk of result.textStream) answer += chunk;
  } catch (e) {
    upstreamError ??= e;
  }

  const runId = runIdFetch.getRunId();
  const extra = runId ? { "X-Lovable-AIG-Run-ID": runId } : undefined;

  if (req.signal.aborted) return json({ error: "Request cancelled." }, 499, extra);

  if (upstreamError || !answer.trim()) {
    const status = (upstreamError as { statusCode?: number })?.statusCode;
    console.error("crop-diagnosis error", status, upstreamError);
    if (status === 429) return json({ error: "Too many requests right now. Please try again in a minute." }, 429, extra);
    if (status === 402) return json({ error: "The AI service has run out of credits. Please contact the site owner." }, 402, extra);
    if (status === 403) return json({ error: "The AI service declined this request." }, 403, extra);
    if (status === 400) return json({ error: "The photos or description could not be processed. Try a different photo." }, 400, extra);
    return json({ error: "The AI could not produce an answer. Please try again later." }, 502, extra);
  }

  return json({ answer }, 200, extra);
});
