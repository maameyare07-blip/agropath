import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Wordmark from "@/components/Wordmark";
import AgroPathLogo from "@/components/AgroPathLogo";
import Seo from "@/components/Seo";
import LangToggle from "@/components/LangToggle";
import { useFarmerLang } from "@/lib/farmerI18n";
import { useAuthUser } from "@/hooks/useAuthUser";

type Mode = "signin" | "signup" | "forgot";

const FarmerAuth = () => {
  const { t } = useFarmerLang();
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (user) navigate("/farmer/dashboard", { replace: true });
  }, [user, navigate]);

  const fail = (msg: string) => toast({ title: t.error, description: msg, variant: "destructive" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setInfo(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) fail(error.message);
    } else if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/farmer/login` },
      });
      if (error) fail(error.message);
      else setInfo(t.checkEmail);
    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) fail(error.message);
      else setInfo(t.resetSent);
    }
    setLoading(false);
  };

  const google = async () => {
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/farmer/login` });
    if (res.error) fail(res.error.message);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <Seo title="Farmer Sign In | AgroPath" description="Sign in to your AgroPath farm dashboard." path="/farmer/login" noindex />
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2">
            <AgroPathLogo className="w-8 h-8" />
            <Wordmark className="font-heading font-bold text-xl" />
          </Link>
          <LangToggle />
        </div>
        <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
              {mode === "signup" ? t.signUp : mode === "forgot" ? t.forgot : t.signIn}
            </h1>
            <p className="text-sm text-muted-foreground">{t.authIntro}</p>
          </div>

          {mode !== "forgot" && (
            <>
              <Button type="button" variant="outline" className="w-full h-11" onClick={google}>{t.google}</Button>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />{t.or}<span className="h-px flex-1 bg-border" />
              </div>
            </>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">{t.email}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" />
            </div>
            {mode !== "forgot" && (
              <div className="space-y-1.5">
                <Label htmlFor="password">{t.password}</Label>
                <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" />
              </div>
            )}
            {info && <p className="text-sm text-primary">{info}</p>}
            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {mode === "signup" ? t.signUp : mode === "forgot" ? t.sendReset : t.signIn}
            </Button>
          </form>

          <div className="flex flex-col gap-1 text-sm">
            {mode === "signin" && (
              <>
                <button type="button" className="text-primary min-h-11 text-left" onClick={() => setMode("signup")}>{t.noAccount}</button>
                <button type="button" className="text-muted-foreground min-h-11 text-left" onClick={() => setMode("forgot")}>{t.forgot}</button>
              </>
            )}
            {mode !== "signin" && (
              <button type="button" className="text-primary min-h-11 text-left" onClick={() => setMode("signin")}>{t.haveAccount}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerAuth;
