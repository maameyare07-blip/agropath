import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Loader2, ExternalLink, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useText } from "@/lib/farmerI18n";
import { safeContentUrl, type ContentItem } from "@/lib/publishedContent";

const blank = { title: "", summary: "", kind: "article", status: "draft", url: "", in_book: "", publication_year: "", authors: "" };
type Form = typeof blank & { id?: string };
export default function AdminContent() {
  const text = useText();
  const cache = useQueryClient();
  const [rows, setRows] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Form | null>(null);
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState<ContentItem | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("published_content").select("*").order("created_at", { ascending: false });
    setFailed(!!error); setRows(data ?? []); setLoading(false);
  }, []);
  useEffect(() => { void load(); }, [load]);
  const refresh = () => { void cache.invalidateQueries({ queryKey: ["published-content"] }); void load(); };
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || busy) return;
    if (form.url && !safeContentUrl(form.url)) { toast({ title: text("Enter an HTTPS link or a site file path"), variant: "destructive" }); return; }
    const payload = { title: form.title.trim(), summary: form.summary.trim(), kind: form.kind, status: form.status, url: form.url || null, in_book: form.in_book.trim(), publication_year: form.publication_year ? Number(form.publication_year) : null, authors: form.authors.split(";").map(a => a.trim()).filter(Boolean) };
    if (!payload.title) return;
    setBusy(true);
    const result = form.id ? await supabase.from("published_content").update(payload).eq("id", form.id).select("id").single() : await supabase.from("published_content").insert(payload).select("id").single();
    setBusy(false);
    if (result.error) { toast({ title: text("Save failed"), variant: "destructive" }); return; }
    setForm(null); toast({ title: text("Content saved") }); refresh();
  };
  const remove = async () => {
    if (!deleting || busy) return;
    setBusy(true);
    const { error } = await supabase.from("published_content").delete().eq("id", deleting.id).select("id").single();
    setBusy(false);
    if (error) { toast({ title: text("Delete failed"), variant: "destructive" }); return; }
    setDeleting(null); toast({ title: text("Content deleted") }); refresh();
  };
  const visible = rows.filter(r => (filter === "all" || r.status === filter) && `${r.title} ${r.summary}`.toLowerCase().includes(search.toLowerCase()));
  return <main>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6"><h1 className="font-heading text-3xl font-bold">{text("Published content")}</h1><div className="flex gap-2"><Button variant="outline" size="icon" title={text("Refresh")} aria-label={text("Refresh")} onClick={load} disabled={loading}><RefreshCw /></Button><Button onClick={() => setForm({ ...blank })}><Plus />{text("Add content")}</Button></div></div>
    <div className="flex flex-wrap gap-3 mb-6"><Input aria-label={text("Search content")} placeholder={text("Search content")} value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" /><Select value={filter} onValueChange={setFilter}><SelectTrigger className="w-44" aria-label={text("Filter status")}><SelectValue /></SelectTrigger><SelectContent>{["all", "draft", "published"].map(s => <SelectItem key={s} value={s}>{text(s === "all" ? "All content" : s === "draft" ? "Draft" : "Published")}</SelectItem>)}</SelectContent></Select></div>
    {loading ? <Loader2 className="animate-spin text-primary my-12" /> : failed ? <div role="alert"><p>{text("Unable to load content")}</p><Button onClick={load}>{text("Retry")}</Button></div> : !visible.length ? <p className="py-12 text-muted-foreground">{text("No content found")}</p> : <div className="divide-y border-y">{visible.map(row => <article key={row.id} className="py-6"><div className="flex flex-wrap justify-between gap-4"><div className="min-w-0 flex-1"><div className="flex gap-2 items-center text-xs mb-2"><span className="text-primary font-semibold">{text(row.kind === "publication" ? "Publication" : "Article")}</span><span className="px-2 py-1 rounded border bg-muted text-muted-foreground">{text(row.status === "published" ? "Published" : "Draft")}</span></div><h2 className="font-heading text-xl font-semibold break-words">{row.title}</h2><p className="text-muted-foreground mt-2 whitespace-pre-wrap break-words">{row.summary}</p>{row.in_book && <p className="text-sm text-muted-foreground mt-2">{row.in_book} · {row.publication_year}</p>}</div><div className="flex items-start gap-1"><Button variant="outline" size="icon" title={text("Edit")} aria-label={`${text("Edit")} ${row.title}`} onClick={() => setForm({ id: row.id, title: row.title, summary: row.summary, kind: row.kind, status: row.status, url: row.url ?? "", in_book: row.in_book, publication_year: row.publication_year?.toString() ?? "", authors: row.authors.join("; ") })}><Pencil /></Button>{safeContentUrl(row.url) && <Button asChild variant="ghost" size="icon"><a href={safeContentUrl(row.url)} target="_blank" rel="noopener noreferrer" aria-label={text("Open link")} title={text("Open link")}><ExternalLink /></a></Button>}<Button variant="ghost" size="icon" className="text-destructive" title={text("Delete")} aria-label={`${text("Delete")} ${row.title}`} onClick={() => setDeleting(row)}><Trash2 /></Button></div></div></article>)}</div>}
    <Dialog open={!!form} onOpenChange={open => { if (!open && !busy) setForm(null); }}><DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl"><DialogHeader><DialogTitle>{text(form?.id ? "Edit content" : "Add content")}</DialogTitle></DialogHeader>{form && <form onSubmit={save} className="space-y-4">
      <div className="grid grid-cols-2 gap-4"><div><Label>{text("Type")}</Label><Select value={form.kind} onValueChange={kind => setForm({ ...form, kind })}><SelectTrigger aria-label={text("Type")}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="article">{text("Article")}</SelectItem><SelectItem value="publication">{text("Publication")}</SelectItem></SelectContent></Select></div><div><Label>{text("Status")}</Label><Select value={form.status} onValueChange={status => setForm({ ...form, status })}><SelectTrigger aria-label={text("Status")}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">{text("Draft")}</SelectItem><SelectItem value="published">{text("Published")}</SelectItem></SelectContent></Select></div></div>
      <div><Label htmlFor="content-title">{text("Title")}</Label><Input id="content-title" required maxLength={300} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
      <div><Label htmlFor="content-summary">{text("Summary")}</Label><Textarea id="content-summary" rows={5} value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} /></div>
      <div><Label htmlFor="content-url">{text("Link / PDF URL")}</Label><Input id="content-url" dir="ltr" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} /></div>
      {form.kind === "publication" && <><div><Label htmlFor="content-book">{text("Book / journal")}</Label><Input id="content-book" value={form.in_book} onChange={e => setForm({ ...form, in_book: e.target.value })} /></div><div><Label htmlFor="content-year">{text("Year")}</Label><Input id="content-year" type="number" min={1000} max={9999} value={form.publication_year} onChange={e => setForm({ ...form, publication_year: e.target.value })} /></div><div><Label htmlFor="content-authors">{text("Authors (separated by semicolons)")}</Label><Input id="content-authors" value={form.authors} onChange={e => setForm({ ...form, authors: e.target.value })} /></div></>}
      <div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={busy} onClick={() => setForm(null)}>{text("Cancel")}</Button><Button type="submit" disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : text("Save changes")}</Button></div>
    </form>}</DialogContent></Dialog>
    <AlertDialog open={!!deleting} onOpenChange={open => { if (!open && !busy) setDeleting(null); }}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{text("Delete content?")}</AlertDialogTitle><AlertDialogDescription>{deleting?.title}<br />{text("This cannot be undone.")}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={busy}>{text("Cancel")}</AlertDialogCancel><Button variant="destructive" disabled={busy} onClick={remove}>{text("Delete")}</Button></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </main>;
}