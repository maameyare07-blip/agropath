import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Activity, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useFarmerLang, useText } from "@/lib/farmerI18n";

const PAGE_SIZE = 25;
export default function AdminErrors() {
  const text = useText();
  const { lang } = useFarmerLang();
  const cache = useQueryClient();
  const [page, setPage] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const rows = useQuery({ queryKey: ["admin-errors", page], queryFn: async () => {
    const { data, count, error } = await supabase.from("client_errors").select("id,created_at,route,message,user_agent,viewport,stack", { count: "exact" }).order("created_at", { ascending: false }).order("id").range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
    if (error) throw error;
    return { items: data ?? [], count: count ?? 0 };
  }});
  const clear = async () => {
    setBusy(true);
    const { error } = await supabase.from("client_errors").delete().lte("created_at", new Date().toISOString());
    setBusy(false);
    if (error) { toast({ title: text("Delete failed"), variant: "destructive" }); return; }
    setConfirm(false); setPage(0);
    void cache.invalidateQueries({ queryKey: ["admin-errors"] });
    void cache.invalidateQueries({ queryKey: ["admin-stats"] });
    toast({ title: text("Client errors cleared") });
  };
  return <main>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6"><div><h1 className="font-heading text-3xl font-bold">{text("Site health")}</h1><p className="text-muted-foreground mt-2">{rows.data?.count ?? "—"} {text("Client errors")}</p></div><div className="flex flex-wrap gap-2"><Button variant="outline" disabled={rows.isFetching} onClick={() => void rows.refetch()}><RefreshCw />{text("Refresh")}</Button><Button variant="destructive" disabled={rows.isPending || rows.isError || !rows.data?.count} onClick={() => setConfirm(true)}><Trash2 />{text("Clear all")}</Button></div></div>
    {rows.isPending ? <Loader2 aria-label={text("Loading")} className="animate-spin text-primary" /> : rows.isError ? <div role="alert"><p>{text("Unable to load client errors")}</p><Button className="mt-4" onClick={() => void rows.refetch()}>{text("Retry")}</Button></div> : <>
      {rows.data.items.length === 0 ? <div className="py-16 text-center text-muted-foreground"><Activity className="mx-auto mb-4" />{text("No client errors found")}</div> : <div className="space-y-4">{rows.data.items.map(row => <article key={row.id} className="bg-card border border-border rounded-lg p-4 sm:p-6 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground mb-3"><time>{new Date(row.created_at).toLocaleString(lang)}</time><span dir="ltr" className="break-all">{row.route || "—"}</span></div>
        <p dir="auto" className="font-medium whitespace-pre-wrap break-words">{row.message}</p>
        <dl className="mt-4 text-sm"><dt className="font-semibold">{text("Device")}</dt><dd dir="ltr" className="break-all text-muted-foreground mt-1">{row.user_agent || "—"}{row.viewport ? ` · ${row.viewport}` : ""}</dd></dl>
        {row.stack && <details className="mt-4"><summary className="text-primary cursor-pointer min-h-11 flex items-center">{text("Stack trace")}</summary><pre dir="ltr" className="whitespace-pre-wrap break-all bg-muted p-3 rounded-md text-xs">{row.stack}</pre></details>}
      </article>)}</div>}
      <div className="flex items-center justify-between gap-2 mt-6"><Button variant="outline" disabled={page === 0 || rows.isFetching} onClick={() => setPage(p => p - 1)}>{text("Previous")}</Button><span className="text-sm">{page + 1} / {Math.max(1, Math.ceil(rows.data.count / PAGE_SIZE))}</span><Button variant="outline" disabled={(page + 1) * PAGE_SIZE >= rows.data.count || rows.isFetching} onClick={() => setPage(p => p + 1)}>{text("Next")}</Button></div>
    </>}
    <AlertDialog open={confirm} onOpenChange={open => { if (!busy) setConfirm(open); }}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{text("Clear all client errors?")}</AlertDialogTitle><AlertDialogDescription>{text("This removes all recorded client errors. This cannot be undone.")}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={busy}>{text("Cancel")}</AlertDialogCancel><Button variant="destructive" disabled={busy} onClick={clear}>{busy ? <Loader2 className="animate-spin" /> : text("Clear all")}</Button></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </main>;
}