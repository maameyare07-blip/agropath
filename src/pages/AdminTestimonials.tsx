import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Leaf, LogOut, Loader2, Check, X, Trash2, Pencil, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

type Row = {
  id: string;
  full_name: string;
  position: string;
  organization: string;
  email: string;
  photo_url: string | null;
  message: string;
  permission_granted: boolean;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
};

type Filter = "all" | "pending" | "approved" | "rejected";

const StatusBadge = ({ s }: { s: Row["status"] }) => {
  const styles: Record<Row["status"], string> = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full border font-medium capitalize ${styles[s]}`}>
      {s}
    </span>
  );
};

const AdminTestimonials = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("pending");
  const [editing, setEditing] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
    }
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/admin/login", { replace: true });
        return;
      }
      setCheckingAuth(false);
      load();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, load]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  const setStatus = async (row: Row, status: Row["status"]) => {
    const { error } = await supabase.from("testimonials").update({ status }).eq("id", row.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `Marked as ${status}` });
    load();
  };

  const remove = async () => {
    if (!deleting) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", deleting.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted" });
      load();
    }
    setDeleting(null);
  };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    const { error } = await supabase
      .from("testimonials")
      .update({
        full_name: editing.full_name,
        position: editing.position,
        organization: editing.organization,
        message: editing.message,
        photo_url: editing.photo_url,
      })
      .eq("id", editing.id);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Saved" });
    setEditing(null);
    load();
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const filtered = filter === "all" ? rows : rows.filter((r) => r.status === filter);
  const counts = {
    all: rows.length,
    pending: rows.filter((r) => r.status === "pending").length,
    approved: rows.filter((r) => r.status === "approved").length,
    rejected: rows.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-heading font-bold text-foreground">AgroPath Admin</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Testimonials
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Review submissions and manage what appears on the site.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["pending", "approved", "rejected", "all"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors capitalize ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:bg-secondary"
                }`}
              >
                {f} ({counts[f]})
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground bg-card border border-border rounded-xl">
            No testimonials in this view.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-xl p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-shrink-0">
                    {r.photo_url ? (
                      <img
                        src={r.photo_url}
                        alt={r.full_name}
                        className="w-20 h-20 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                        {r.full_name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="font-heading font-semibold text-foreground">{r.full_name}</h3>
                        <p className="text-sm text-primary">{r.position}</p>
                        <p className="text-sm text-muted-foreground">{r.organization}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <a href={`mailto:${r.email}`} className="hover:underline">
                            {r.email}
                          </a>{" "}
                          · {new Date(r.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <StatusBadge s={r.status} />
                    </div>
                    <p className="mt-3 text-foreground/90 whitespace-pre-wrap text-sm leading-relaxed">
                      {r.message}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {r.status !== "approved" && (
                        <Button size="sm" onClick={() => setStatus(r, "approved")}>
                          <Check className="w-4 h-4 mr-1" /> Approve
                        </Button>
                      )}
                      {r.status !== "rejected" && (
                        <Button size="sm" variant="outline" onClick={() => setStatus(r, "rejected")}>
                          <X className="w-4 h-4 mr-1" /> Reject
                        </Button>
                      )}
                      {r.status !== "pending" && (
                        <Button size="sm" variant="ghost" onClick={() => setStatus(r, "pending")}>
                          Mark pending
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => setEditing(r)}>
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleting(r)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                      {r.photo_url && (
                        <a
                          href={r.photo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-muted-foreground hover:text-primary ml-auto"
                        >
                          Photo <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit testimonial</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full name</Label>
                  <Input
                    className="mt-2"
                    value={editing.full_name}
                    onChange={(e) => setEditing({ ...editing, full_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    className="mt-2"
                    value={editing.position}
                    onChange={(e) => setEditing({ ...editing, position: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Organization</Label>
                <Input
                  className="mt-2"
                  value={editing.organization}
                  onChange={(e) => setEditing({ ...editing, organization: e.target.value })}
                />
              </div>
              <div>
                <Label>Photo URL</Label>
                <Input
                  className="mt-2"
                  value={editing.photo_url ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, photo_url: e.target.value || null })
                  }
                />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea
                  className="mt-2"
                  rows={6}
                  value={editing.message}
                  onChange={(e) => setEditing({ ...editing, message: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={saveEdit} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete testimonial?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the submission from {deleting?.full_name}. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={remove} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminTestimonials;
