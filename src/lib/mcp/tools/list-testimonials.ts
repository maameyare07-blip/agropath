import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

type Testimonial = {
  id: string;
  full_name: string;
  email: string;
  organization: string;
  position: string;
  message: string;
  status: string;
  permission_granted: boolean;
  created_at: string;
};

const deny = (text: string) => ({
  content: [{ type: "text" as const, text }],
  isError: true,
});

export default defineTool({
  name: "list_testimonials",
  title: "List testimonial submissions (admin only)",
  description:
    "Private tool. Returns testimonial submissions including pending ones and the submitter's email. Requires a signed-in administrator of AgroPath; any other caller is refused.",
  inputSchema: {
    status: z
      .enum(["pending", "approved", "rejected", "all"])
      .optional()
      .describe("Filter by submission status. Defaults to all."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async (args, ctx) => {
    const token = ctx.getToken();
    const userId = ctx.getUserId();
    if (!token || !userId) {
      return deny("Sign-in required: this tool only works for a signed-in AgroPath administrator.");
    }

    const baseUrl = (globalThis as { Deno?: { env: { get(k: string): string | undefined } } }).Deno?.env.get(
      "SUPABASE_URL",
    );
    const apiKey = (globalThis as { Deno?: { env: { get(k: string): string | undefined } } }).Deno?.env.get(
      "SUPABASE_ANON_KEY",
    );
    if (!baseUrl || !apiKey) {
      return deny("Backend is not configured for this tool.");
    }

    const headers = {
      apikey: apiKey,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const roleRes = await fetch(`${baseUrl}/rest/v1/rpc/has_role`, {
      method: "POST",
      headers,
      body: JSON.stringify({ _user_id: userId, _role: "admin" }),
    });
    if (!roleRes.ok) {
      return deny("Could not verify your permissions.");
    }
    const isAdmin = (await roleRes.json()) === true;
    if (!isAdmin) {
      return deny("Access denied: administrator access is required for testimonial submissions.");
    }

    const status = args?.status ?? "all";
    const query = new URLSearchParams({
      select: "id,full_name,email,organization,position,message,status,permission_granted,created_at",
      order: "created_at.desc",
      limit: "100",
    });
    if (status !== "all") query.set("status", `eq.${status}`);

    const res = await fetch(`${baseUrl}/rest/v1/testimonials?${query.toString()}`, { headers });
    if (!res.ok) {
      return deny("Could not load testimonial submissions.");
    }
    const testimonials = (await res.json()) as Testimonial[];

    return {
      content: [{ type: "text", text: JSON.stringify(testimonials, null, 2) }],
      structuredContent: { count: testimonials.length, testimonials },
    };
  },
});
