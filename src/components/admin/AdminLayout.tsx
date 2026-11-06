import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Loader2, LogOut, Mail, MessageSquare, BookOpen, ShieldCheck, LayoutDashboard, Sprout, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import AgroPathLogo from "@/components/AgroPathLogo";
import Wordmark from "@/components/Wordmark";
import Seo from "@/components/Seo";
import LangToggle from "@/components/LangToggle";
import { useText } from "@/lib/farmerI18n";

export default function AdminLayout() {
  const [access, setAccess] = useState<"checking" | "allowed" | "denied" | "error">("checking");
  const [attempt, setAttempt] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const text = useText();
  useEffect(() => {
    let active = true;
    const verify = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!active) return;
      if (!data.user) {
        navigate(`/admin/login?next=${encodeURIComponent(location.pathname)}`, { replace: true });
        return;
      }
      if (error) { setAccess("error"); return; }
      const result = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
      if (active) setAccess(result.error ? "error" : result.data === true ? "allowed" : "denied");
    };
    setAccess("checking");
    void verify();
    const { data } = supabase.auth.onAuthStateChange(() => {
      if (active) { setAccess("checking"); window.setTimeout(() => { if (active) void verify(); }, 0); }
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, [navigate, location.pathname, attempt]);
  if (access === "checking") return <div className="min-h-screen grid place-items-center"><Loader2 aria-label={text("Loading")} className="animate-spin text-primary" /></div>;
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) navigate("/admin/login", { replace: true });
  };
  if (access !== "allowed") return <main className="min-h-screen flex flex-col items-center justify-center gap-5 px-4"><h1 className="text-2xl font-bold">{text(access === "denied" ? "Admin access required" : "Unable to verify access")}</h1><Button onClick={signOut}>{text("Sign out")}</Button>{access === "error" && <Button variant="outline" onClick={() => setAttempt(a => a + 1)}>{text("Retry")}</Button>}<Button asChild variant="outline"><Link to="/">{text("Home")}</Link></Button></main>;
  return <div className="min-h-screen bg-background">
    <Seo title="Admin | AgroPath" description="Private AgroPath administration." path={location.pathname} noindex />
    <header className="border-b bg-card"><div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2"><AgroPathLogo className="w-8 h-8" /><Wordmark className="font-heading text-xl font-bold" /></Link>
      <div className="flex items-center gap-2"><LangToggle /><Button variant="ghost" onClick={signOut}><LogOut />{text("Sign out")}</Button></div>
    </div></header>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8"><div className="flex items-center gap-2 text-primary mb-5"><ShieldCheck className="w-5 h-5" /><span className="font-semibold">{text("Admin panel")}</span></div>
      <nav aria-label={text("Admin navigation")} className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 border-b pb-5 mb-8">{[
        { to: "/admin/overview", label: "Overview", icon: LayoutDashboard },
        { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
        { to: "/admin/subscribers", label: "Subscribers", icon: Mail },
        { to: "/admin/content", label: "Content", icon: BookOpen },
        { to: "/admin/diagnoses", label: "Crop Doctor", icon: Sprout },
        { to: "/admin/errors", label: "Site health", icon: Activity },
      ].map(item => <NavLink key={item.to} to={item.to} className="min-w-0">{({ isActive }) => <Button asChild variant={isActive ? "default" : "ghost"} className="min-h-11 h-auto w-full sm:w-auto whitespace-normal justify-start px-3 py-3"><span><item.icon className="shrink-0" />{text(item.label)}</span></Button>}</NavLink>)}</nav>
      <Outlet />
    </div>
  </div>;
}