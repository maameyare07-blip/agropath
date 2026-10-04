import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LogOut, Sprout, Trash2, Pencil } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LangToggle from "@/components/LangToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useFarmerLang } from "@/lib/farmerI18n";

type Diagnosis = Tables<"diagnoses"> & { urls: string[] };
type Log = Tables<"symptom_logs">;
type Note = Tables<"crop_notes">;

const card = "bg-card rounded-2xl border border-border shadow-sm p-5 sm:p-6";
const fmt = (d: string) => new Date(d).toLocaleDateString();

const Diagnoses = () => {
  const { t } = useFarmerLang();
  const [items, setItems] = useState<Diagnosis[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("diagnoses").select("*").order("created_at", { ascending: false });
      const rows = data ?? [];
      const paths = rows.flatMap((r) => r.photo_paths);
      const signed = paths.length
        ? (await supabase.storage.from("crop-photos").createSignedUrls(paths, 3600)).data ?? []
        : [];
      const map = new Map(signed.map((s) => [s.path, s.signedUrl]));
      setItems(rows.map((r) => ({ ...r, urls: r.photo_paths.map((p) => map.get(p)).filter(Boolean) as string[] })));
    })();
  }, []);

  const remove = async (d: Diagnosis) => {
    if (d.photo_paths.length) await supabase.storage.from("crop-photos").remove(d.photo_paths);
    await supabase.from("diagnoses").delete().eq("id", d.id);
    setItems((p) => p?.filter((x) => x.id !== d.id) ?? null);
  };

  if (!items) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;
  return (
    <div className="space-y-4">
      <Button asChild className="h-11 gap-2"><Link to="/crop-doctor"><Sprout className="w-4 h-4" />{t.newDiagnosis}</Link></Button>
      {items.length === 0 && <p className="text-muted-foreground">{t.noDiagnoses}</p>}
      {items.map((d) => (
        <div key={d.id} className={card}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-lg text-foreground">{d.crop || "—"}</h3>
              <p className="text-xs text-muted-foreground">{fmt(d.created_at)}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-11 w-11" aria-label={t.del} onClick={() => remove(d)}><Trash2 className="w-4 h-4" /></Button>
          </div>
          {d.urls.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {d.urls.map((u, i) => (
                <a key={i} href={u} target="_blank" rel="noopener noreferrer">
                  <img src={u} alt={`${d.crop ?? "Crop"} photo ${i + 1}`} className="w-24 h-24 object-cover rounded-xl border border-border" />
                </a>
              ))}
            </div>
          )}
          {d.symptoms && <p className="text-sm text-muted-foreground mt-3"><strong className="text-foreground">{t.symptomsLabel}:</strong> {d.symptoms}</p>}
          <button className="text-primary text-sm mt-2 min-h-11" onClick={() => setOpen(open === d.id ? null : d.id)}>
            {open === d.id ? t.hide : t.show}
          </button>
          {open === d.id && <div className="whitespace-pre-wrap text-sm text-muted-foreground">{d.answer.replace(/[#*]/g, "")}</div>}
        </div>
      ))}
    </div>
  );
};

const Tracker = ({ userId }: { userId: string }) => {
  const { t } = useFarmerLang();
  const [logs, setLogs] = useState<Log[]>([]);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ crop: "", plot: "", severity: 3, notes: "", observed_on: new Date().toISOString().slice(0, 10) });

  const load = async () => {
    const { data } = await supabase.from("symptom_logs").select("*").order("observed_on");
    setLogs(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const crops = useMemo(() => Array.from(new Set(logs.map((l) => l.crop))), [logs]);
  const shown = filter ? logs.filter((l) => l.crop === filter) : logs;

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("symptom_logs").insert({ ...form, plot: form.plot || null, notes: form.notes || null, user_id: userId });
    if (error) return toast({ title: t.error, variant: "destructive" });
    setForm((f) => ({ ...f, notes: "" }));
    load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={add} className={`${card} grid sm:grid-cols-2 gap-4`}>
        <div className="space-y-1.5"><Label htmlFor="lc">{t.crop}</Label><Input id="lc" required maxLength={100} className="h-11" value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })} /></div>
        <div className="space-y-1.5"><Label htmlFor="lp">{t.plot}</Label><Input id="lp" maxLength={100} className="h-11" value={form.plot} onChange={(e) => setForm({ ...form, plot: e.target.value })} /></div>
        <div className="space-y-1.5">
          <Label htmlFor="ls">{t.severity}: {form.severity}</Label>
          <input id="ls" type="range" min={1} max={5} value={form.severity} onChange={(e) => setForm({ ...form, severity: Number(e.target.value) })} className="w-full h-11 accent-primary" />
          <p className="text-xs text-muted-foreground">{t.severityHint}</p>
        </div>
        <div className="space-y-1.5"><Label htmlFor="ld">{t.observedOn}</Label><Input id="ld" type="date" required className="h-11" value={form.observed_on} onChange={(e) => setForm({ ...form, observed_on: e.target.value })} /></div>
        <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="ln">{t.notesField}</Label><Textarea id="ln" maxLength={1000} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
        <Button type="submit" className="h-11 sm:col-span-2">{t.addEntry}</Button>
      </form>

      {logs.length === 0 ? <p className="text-muted-foreground">{t.noLogs}</p> : (
        <div className={card}>
          <select aria-label={t.crop} value={filter} onChange={(e) => setFilter(e.target.value)} className="h-11 rounded-md border border-input bg-background px-3 mb-4">
            <option value="">{t.allCrops}</option>
            {crops.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={shown.map((l) => ({ date: fmt(l.observed_on), severity: l.severity, crop: l.crop }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="severity" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {[...shown].reverse().map((l) => (
              <li key={l.id} className="py-3 flex items-start justify-between gap-3 text-sm">
                <div>
                  <p className="text-foreground font-medium">{l.crop}{l.plot ? ` · ${l.plot}` : ""} — {t.severity} {l.severity}/5</p>
                  <p className="text-muted-foreground">{fmt(l.observed_on)}{l.notes ? ` · ${l.notes}` : ""}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-11 w-11" aria-label={t.del} onClick={async () => { await supabase.from("symptom_logs").delete().eq("id", l.id); load(); }}><Trash2 className="w-4 h-4" /></Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Notes = ({ userId }: { userId: string }) => {
  const { t } = useFarmerLang();
  const [notes, setNotes] = useState<Note[]>([]);
  const empty = { title: "", crop: "", body: "" };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from("crop_notes").select("*").order("updated_at", { ascending: false });
    setNotes(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title: form.title, crop: form.crop || null, body: form.body };
    const { error } = editing
      ? await supabase.from("crop_notes").update(payload).eq("id", editing)
      : await supabase.from("crop_notes").insert({ ...payload, user_id: userId });
    if (error) return toast({ title: t.error, variant: "destructive" });
    setForm(empty); setEditing(null); load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={save} className={`${card} space-y-4`}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5"><Label htmlFor="nt">{t.title}</Label><Input id="nt" required maxLength={150} className="h-11" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div className="space-y-1.5"><Label htmlFor="nc">{t.crop}</Label><Input id="nc" maxLength={100} className="h-11" value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })} /></div>
        </div>
        <div className="space-y-1.5"><Label htmlFor="nb">{t.notesField}</Label><Textarea id="nb" rows={4} maxLength={5000} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></div>
        <div className="flex gap-2">
          <Button type="submit" className="h-11">{editing ? t.update : t.addNote}</Button>
          {editing && <Button type="button" variant="outline" className="h-11" onClick={() => { setEditing(null); setForm(empty); }}>{t.cancel}</Button>}
        </div>
      </form>
      {notes.length === 0 && <p className="text-muted-foreground">{t.noNotes}</p>}
      {notes.map((n) => (
        <div key={n.id} className={card}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-bold text-foreground">{n.title}</h3>
              <p className="text-xs text-muted-foreground">{n.crop ? `${n.crop} · ` : ""}{fmt(n.updated_at)}</p>
            </div>
            <div className="flex">
              <Button variant="ghost" size="icon" className="h-11 w-11" aria-label={t.edit} onClick={() => { setEditing(n.id); setForm({ title: n.title, crop: n.crop ?? "", body: n.body }); window.scrollTo({ top: 0, behavior: "smooth" }); }}><Pencil className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-11 w-11" aria-label={t.del} onClick={async () => { await supabase.from("crop_notes").delete().eq("id", n.id); load(); }}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
          {n.body && <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{n.body}</p>}
        </div>
      ))}
    </div>
  );
};

const FarmerDashboard = () => {
  const { t } = useFarmerLang();
  const { user, loading } = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/farmer/login", { replace: true });
  }, [loading, user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Seo title="My Farm Dashboard | AgroPath" description="Your saved crop diagnoses, symptom tracker and notes." path="/farmer/dashboard" noindex />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">{t.dashboard}</h1>
              <p className="text-muted-foreground mt-2">{t.dashboardIntro}</p>
            </div>
            <div className="flex gap-2">
              <LangToggle />
              <Button variant="outline" size="sm" className="h-11 gap-2" onClick={() => supabase.auth.signOut()}><LogOut className="w-4 h-4" />{t.signOut}</Button>
            </div>
          </div>
          {!user ? <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" /> : (
            <Tabs defaultValue="diagnoses">
              <TabsList className="w-full grid grid-cols-3 h-auto mb-6">
                <TabsTrigger value="diagnoses" className="min-h-11">{t.diagnoses}</TabsTrigger>
                <TabsTrigger value="tracker" className="min-h-11">{t.tracker}</TabsTrigger>
                <TabsTrigger value="notes" className="min-h-11">{t.notes}</TabsTrigger>
              </TabsList>
              <TabsContent value="diagnoses"><Diagnoses /></TabsContent>
              <TabsContent value="tracker"><Tracker userId={user.id} /></TabsContent>
              <TabsContent value="notes"><Notes userId={user.id} /></TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FarmerDashboard;
