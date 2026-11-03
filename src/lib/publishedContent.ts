import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
export type ContentItem = Tables<"published_content">;
export function safeContentUrl(url: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("/") && !url.startsWith("//") && !url.includes("\\")) return url;
  try { const parsed = new URL(url); return parsed.protocol === "https:" ? url : undefined; } catch { return undefined; }
}
export function usePublishedContent(kind: "article" | "publication") {
  return useQuery({ queryKey: ["published-content", kind], queryFn: async () => {
    const { data, error } = await supabase.from("published_content").select("*").eq("kind", kind).eq("status", "published").order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  }});
}