import { useCallback, useEffect, useState } from "react";
import { Loader2, Trash2, RefreshCw, Search, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useText } from "@/lib/farmerI18n";

type Subscriber = { id: string; email: string; created_at: string };
const PAGE_SIZE = 25;
export default function AdminSubscribers() {
  const text = useText();
  const [rows, setRows] = useState<Subscriber[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [deleting, setDeleting] = useState<Subscriber | null>(null);
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    setLoading(true);
    let request = supabase.from("subscribers").select("id,email,created_at", { count: "exact" }).order("created_at", { ascending: false }).order("id");
    const search = query.replace(/[%_\\]/g, "").trim();
    if (search) request = request.ilike("email", `%${search}%`);
    const { data, count: total, error } = await request.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
    setFailed(!!error);
    setRows(data ?? []); setCount(total ?? 0); setLoading(false);
  }, [page, query]);
  useEffect(() => { const timer = window.setTimeout(() => void load(), 200); return () => clearTimeout(timer); }, [load]);
  const remove = async () => {
    if (!deleting) return;
    setBusy(true);
    const { error } = await supabase.from("subscribers").delete().eq("id", deleting.id).select("id").single();
    setBusy(false);
    if (error) { toast({ title: text("Delete failed"), variant: "destructive" }); return; }
    setDeleting(null); toast({ title: text("Subscriber removed") });
    if (rows.length === 1 && page > 0) setPage(p => p - 1); else void load();
  };
  return <main>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6"><div><h1 className="font-heading text-3xl font-bold">{text("Subscribers")}</h1><p className="text-muted-foreground mt-2">{count} {text("email signups")}</p></div><Button variant="outline" onClick={load} disabled={loading}><RefreshCw />{text("Refresh")}</Button></div>
    <div className="relative max-w-md mb-6"><Search className="absolute start-3 top-3 w-4 h-4 text-muted-foreground" /><Input aria-label={text("Search email")} placeholder={text("Search email")} className="ps-10" value={query} onChange={e => { setQuery(e.target.value); setPage(0); }} /></div>
    {loading ? <Loader2 aria-label={text("Loading")} className="animate-spin my-12 text-primary" /> : failed ? <div role="alert" className="py-10"><p>{text("Unable to load subscribers")}</p><Button onClick={load} className="mt-4">{text("Retry")}</Button></div> : rows.length === 0 ? <div className="py-16 text-center text-muted-foreground"><Mail className="mx-auto mb-4" />{text("No subscribers found")}</div> : <div className="overflow-x-auto border rounded-lg"><table className="w-full text-sm"><thead className="bg-muted"><tr><th className="text-start p-4">{text("Email")}</th><th className="text-start p-4">{text("Signed up")}</th><th className="p-4"><span className="sr-only">{text("Actions")}</span></th></tr></thead><tbody>{rows.map(row => <tr key={row.id} className="border-t"><td className="p-4 break-all" dir="ltr">{row.email}</td><td className="p-4 whitespace-nowrap text-muted-foreground">{new Date(row.created_at).toLocaleDateString()}</td><td className="p-4 text-end"><Button size="icon" variant="ghost" className="text-destructive min-h-11 min-w-11" aria-label={`${text("Delete")} ${row.email}`} title={text("Delete")} onClick={() => setDeleting(row)}><Trash2 /></Button></td></tr>)}</tbody></table></div>}
    <div className="flex items-center justify-between gap-3 mt-6"><Button variant="outline" disabled={page === 0 || loading} onClick={() => setPage(p => p - 1)}>{text("Previous")}</Button><span className="text-sm text-muted-foreground">{page + 1} / {Math.max(1, Math.ceil(count / PAGE_SIZE))}</span><Button variant="outline" disabled={(page + 1) * PAGE_SIZE >= count || loading} onClick={() => setPage(p => p + 1)}>{text("Next")}</Button></div>
    <AlertDialog open={!!deleting} onOpenChange={open => { if (!open && !busy) setDeleting(null); }}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{text("Remove subscriber?")}</AlertDialogTitle><AlertDialogDescription><span dir="ltr">{deleting?.email}</span><br />{text("This cannot be undone.")}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={busy}>{text("Cancel")}</AlertDialogCancel><Button variant="destructive" disabled={busy} onClick={remove}>{busy ? <Loader2 className="animate-spin" /> : text("Delete")}</Button></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </main>;
}