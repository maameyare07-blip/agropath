import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Loader2, Sprout, X, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useFarmerLang } from "@/lib/farmerI18n";

const MAX_IMAGES = 3;

// Resize to max 1280px and re-encode as JPEG to keep uploads small.
const compressImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read this image."));
    };
    img.src = url;
  });

// Minimal Markdown renderer for headings, lists, and bold text.
const renderInline = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="text-foreground">{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

const Answer = ({ text }: { text: string }) => (
  <div className="space-y-2 text-muted-foreground leading-relaxed">
    {text.split("\n").map((line, i) => {
      const t = line.trim();
      if (!t) return null;
      if (t.startsWith("#")) {
        return (
          <h3 key={i} className="font-heading text-lg font-bold text-foreground pt-3">
            {t.replace(/^#+\s*/, "")}
          </h3>
        );
      }
      if (/^([-*]|\d+\.)\s/.test(t)) {
        return (
          <p key={i} className="pl-4 relative">
            <span className="absolute left-0 text-primary">•</span>
            {renderInline(t.replace(/^([-*]|\d+\.)\s/, ""))}
          </p>
        );
      }
      return <p key={i}>{renderInline(t)}</p>;
    })}
  </div>
);

const CropDoctor = () => {
  const [crop, setCrop] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const { user } = useAuthUser();
  const { t } = useFarmerLang();
  const fileRef = useRef<HTMLInputElement>(null);

  const addFiles = async (files: FileList | null) => {
    if (!files) return;
    setError(null);
    const room = MAX_IMAGES - images.length;
    const picked = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, room);
    try {
      const encoded = await Promise.all(picked.map(compressImage));
      setImages((prev) => [...prev, ...encoded].slice(0, MAX_IMAGES));
    } catch (e) {
      setError((e as Error).message);
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim() && images.length === 0) {
      setError("Please add a photo or describe the symptoms.");
      return;
    }
    setLoading(true);
    setError(null);
    setAnswer(null);
    const { data, error: fnError } = await supabase.functions.invoke("crop-diagnosis", {
      body: { crop, symptoms, images },
    });
    setLoading(false);
    if (fnError) {
      let msg = "Something went wrong. Please try again.";
      try {
        const ctx = (fnError as { context?: Response }).context;
        const parsed = ctx ? await ctx.json() : null;
        if (parsed?.error) msg = parsed.error;
      } catch {
        /* keep default */
      }
      setError(msg);
      return;
    }
    const result = (data as { answer?: string })?.answer ?? null;
    setAnswer(result);
    if (result && user) {
      try {
        const photo_paths: string[] = [];
        for (const img of images) {
          const blob = await (await fetch(img)).blob();
          const path = `${user.id}/${crypto.randomUUID()}.jpg`;
          const { error: upErr } = await supabase.storage.from("crop-photos").upload(path, blob, { contentType: "image/jpeg" });
          if (!upErr) photo_paths.push(path);
        }
        const { error: dbErr } = await supabase.from("diagnoses").insert({
          user_id: user.id, crop: crop || null, symptoms: symptoms || null, answer: result, photo_paths,
        });
        setSaved(!dbErr);
      } catch {
        setSaved(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Crop Doctor — AI Plant Disease Check | AgroPath"
        description="Upload crop photos and describe symptoms to get preliminary plant disease possibilities and practical management guidance, powered by AI."
        path="/crop-doctor"
      />
      <Navbar />
      <main className="pt-24">
        <section className="py-12 lg:py-16 bg-secondary/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">For Farmers</span>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">Crop Doctor</h1>
              <p className="text-muted-foreground text-lg">
                Share photos of your crop and describe what you see. You'll get a quick first opinion
                on possible problems and what you can do about them.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
            <form onSubmit={submit} className="bg-card rounded-2xl border border-border shadow-sm p-6 lg:p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="crop">Crop (optional)</Label>
                <Input id="crop" value={crop} maxLength={100} onChange={(e) => setCrop(e.target.value)} placeholder="e.g. Maize, tomato, sorghum" className="h-11" />
              </div>

              <div className="space-y-2">
                <Label>Photos (up to {MAX_IMAGES})</Label>
                <div className="flex flex-wrap gap-3">
                  {images.map((src, i) => (
                    <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-border">
                      <img src={src} alt={`Crop photo ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImages((p) => p.filter((_, j) => j !== i))}
                        aria-label="Remove photo"
                        className="absolute top-1 right-1 h-7 w-7 rounded-full bg-background/90 flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < MAX_IMAGES && (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="w-24 h-24 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      <Camera className="w-6 h-6" />
                      <span className="text-xs">Add photo</span>
                    </button>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Describe the symptoms</Label>
                <Textarea
                  id="symptoms"
                  value={symptoms}
                  maxLength={2000}
                  rows={5}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. Yellow spots on lower leaves that turn brown, started a week after heavy rain…"
                />
              </div>

              {error && (
                <p className="text-destructive text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> {error}
                </p>
              )}

              <Button type="submit" size="lg" disabled={loading} className="w-full gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sprout className="w-5 h-5" />}
                {loading ? "Analysing… this can take up to a minute" : "Get preliminary diagnosis"}
              </Button>
            </form>

            {answer && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border shadow-sm p-6 lg:p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground">Preliminary assessment</h2>
                <Answer text={answer} />
                <p className="mt-6 text-sm">
                  {user ? (
                    <>
                      {saved && <span className="text-primary">{t.saved} </span>}
                      <Link to="/farmer/dashboard" className="text-primary underline">{t.openDashboard}</Link>
                    </>
                  ) : (
                    <Link to="/farmer/login" className="text-primary underline">{t.signInToSave}</Link>
                  )}
                </p>
              </motion.div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              This is an AI-generated preliminary guide, not a confirmed diagnosis. For serious or spreading problems,
              contact a local extension officer or{" "}
              <a href="/#contact" className="text-primary underline">get in touch</a> for expert help.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CropDoctor;
