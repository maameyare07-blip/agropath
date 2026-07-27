import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { ArrowLeft, CheckCircle2, Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  full_name: z.string().trim().min(2, "Full name is required").max(120),
  position: z.string().trim().min(2, "Position is required").max(160),
  organization: z.string().trim().min(2, "Organization is required").max(160),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().min(20, "Please share at least 20 characters").max(1500),
  permission_granted: z.literal(true, {
    errorMap: () => ({ message: "Permission is required to submit" }),
  }),
});

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const SubmitTestimonial = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    position: "",
    organization: "",
    email: "",
    message: "",
    permission_granted: false,
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleFile = (f: File | null) => {
    if (!f) return setFile(null);
    if (!ACCEPT.includes(f.type)) {
      toast({ title: "Invalid image", description: "Use JPG, PNG, WEBP or GIF.", variant: "destructive" });
      return;
    }
    if (f.size > MAX_BYTES) {
      toast({ title: "Image too large", description: "Max 5MB.", variant: "destructive" });
      return;
    }
    setFile(f);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const first = parsed.error.errors[0];
      toast({ title: "Please check the form", description: first.message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      let photo_url: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("testimonial-photos")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (upErr) throw upErr;
        const { data: signed } = await supabase.storage
          .from("testimonial-photos")
          .createSignedUrl(path, 60 * 60 * 24 * 365 * 5); // 5 years
        photo_url = signed?.signedUrl ?? null;
      }

      const { error } = await supabase.from("testimonials").insert({
        full_name: parsed.data.full_name,
        position: parsed.data.position,
        organization: parsed.data.organization,
        email: parsed.data.email,
        message: parsed.data.message,
        permission_granted: true,
        status: "pending",
        photo_url,
      });
      if (error) throw error;
      setDone(true);
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err?.message ?? "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-10"
        >
          {done ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Thank you!
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your testimonial is pending review and will appear here once approved.
              </p>
              <Button asChild className="mt-8">
                <Link to="/">Return to portfolio</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Share Your Experience
                </span>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mt-3">
                  Submit a Testimonial
                </h1>
                <p className="text-muted-foreground mt-3">
                  Share your experience working with Mohamed. Submissions are reviewed before appearing on the site.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={form.full_name}
                      onChange={(e) => update("full_name", e.target.value)}
                      required
                      maxLength={120}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Professional Title / Position *</Label>
                    <Input
                      id="position"
                      value={form.position}
                      onChange={(e) => update("position", e.target.value)}
                      required
                      maxLength={160}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="organization">Organization / University *</Label>
                    <Input
                      id="organization"
                      value={form.organization}
                      onChange={(e) => update("organization", e.target.value)}
                      required
                      maxLength={160}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                      maxLength={255}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="photo">Profile Photo (optional)</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <label
                      htmlFor="photo"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-secondary cursor-pointer text-sm font-medium transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      {file ? "Change photo" : "Choose file"}
                    </label>
                    <input
                      id="photo"
                      type="file"
                      accept={ACCEPT.join(",")}
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                    />
                    {file && (
                      <span className="text-sm text-muted-foreground truncate">{file.name}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    JPG, PNG, WEBP or GIF. Max 5MB.
                  </p>
                </div>

                <div>
                  <Label htmlFor="message">Testimonial Message *</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    required
                    maxLength={1500}
                    rows={6}
                    className="mt-2"
                    placeholder="Share your experience working with Mohamed…"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {form.message.length}/1500 characters
                  </p>
                </div>

                <label className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border cursor-pointer">
                  <Checkbox
                    checked={form.permission_granted}
                    onCheckedChange={(v) => update("permission_granted", v === true)}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-foreground/90">
                    I give permission for my testimonial to be displayed on this website. *
                  </span>
                </label>

                <Button type="submit" size="lg" disabled={submitting} className="w-full">
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" /> Submitting…
                    </>
                  ) : (
                    "Submit Testimonial"
                  )}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitTestimonial;
