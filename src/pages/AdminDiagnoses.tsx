import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, RefreshCw, Sprout } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useFarmerLang, useText } from "@/lib/farmerI18n";

const PAGE_SIZE = 20;
export default function AdminDiagnoses() {
  const text = useText();
  const { lang } = useFarmerLang();
  const [page, setPage] = useState(0);
  const rows = useQuery({ queryKey: ["admin-diagnoses", page], queryFn: async () => {
    const result = await supabase.from("diagnoses").select("id,user_id,created_at,crop,symptoms,answer,photo_paths", { count: "exact" }).order("created_at", { ascending: false }).order("id").range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
    if (result.error) throw result.error;
    const paths = (result.data ?? []).flatMap(row => row.photo_paths);
    const signed = paths.length ? await supabase.storage.from("crop-photos").createSignedUrls(paths, 3600) : null;
    const urls = new Map((signed?.data ?? []).map(row => [row.path, row.signedUrl]));
    return { count: result.count ?? 0, photoError: !!signed?.error || (signed?.data ?? []).some(row => !!row.error), items: (result.data ?? []).map(row => ({ ...row, photos: row.photo_paths.map(path => urls.get(path)).filter((url): url is string => typeof url === "string" && !!url) })) };
  }, staleTime: 5 * 60 * 1000 });
  return <main>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6"><div><h1 className="font-heading text-3xl font-bold">{text("Crop Doctor")}</h1><p className="text-muted-foreground mt-2">{text("Read-only submissions")} · {rows.data?.count ?? "—"}</p></div><Button variant="outline" disabled={rows.isFetching} onClick={() => void rows.refetch()}><RefreshCw />{text("Refresh")}</Button></div>
    {rows.isPending ? <Loader2 aria-label={text("Loading")} className="animate-spin text-primary" /> : rows.isError ? <div role="alert"><p>{text("Unable to load diagnoses")}</p><Button className="mt-4" onClick={() => void rows.refetch()}>{text("Retry")}</Button></div> : <>
      {rows.data.photoError && <p role="alert" className="text-destructive mb-4">{text("Some photos could not be loaded. Try refreshing.")}</p>}
      {rows.data.items.length === 0 ? <div className="py-16 text-center text-muted-foreground"><Sprout className="mx-auto mb-4" />{text("No saved diagnoses yet.")}</div> : <div className="space-y-4">{rows.data.items.map(row => <article key={row.id} className="bg-card border border-border rounded-lg p-4 sm:p-6 min-w-0">
        <div className="flex flex-wrap justify-between gap-3 mb-4"><div><h2 className="text-xl font-heading font-semibold" dir="auto">{row.crop || "—"}</h2><p className="text-sm text-muted-foreground">{new Date(row.created_at).toLocaleString(lang)}</p></div><p className="text-sm text-muted-foreground">{text("Farmer")} <span dir="ltr" className="font-mono">{row.user_id.slice(0, 8)}</span></p></div>
        <dl className="space-y-4"><div><dt className="font-semibold">{text("Symptoms")}</dt><dd dir="auto" className="whitespace-pre-wrap break-words text-muted-foreground mt-1">{row.symptoms || "—"}</dd></div><div><dt className="font-semibold">{text("Preliminary assessment")}</dt><dd dir="auto" className="whitespace-pre-wrap break-words text-muted-foreground mt-1">{row.answer}</dd></div></dl>
        {row.photos.length > 0 && <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">{row.photos.map((url, index) => <a key={url} href={url} target="_blank" rel="noopener noreferrer"><img src={url} loading="lazy" alt={text("Crop photo {number}", { number: index + 1 })} className="w-full aspect-square object-contain bg-muted rounded-lg border border-border" /></a>)}</div>}
      </article>)}</div>}
      <div className="flex items-center justify-between gap-2 mt-6"><Button variant="outline" disabled={page === 0 || rows.isFetching} onClick={() => setPage(p => p - 1)}>{text("Previous")}</Button><span className="text-sm">{page + 1} / {Math.max(1, Math.ceil(rows.data.count / PAGE_SIZE))}</span><Button variant="outline" disabled={(page + 1) * PAGE_SIZE >= rows.data.count || rows.isFetching} onClick={() => setPage(p => p + 1)}>{text("Next")}</Button></div>
    </>}
  </main>;
}