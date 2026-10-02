import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Seo from "@/components/Seo";
import { useFarmerLang } from "@/lib/farmerI18n";

const ResetPassword = () => {
  const { t } = useFarmerLang();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: t.error, description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: t.passwordSaved });
    navigate("/farmer/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Seo title="Reset Password | AgroPath" description="Set a new password." path="/reset-password" noindex />
      <form onSubmit={onSubmit} className="w-full max-w-md bg-card border border-border rounded-2xl shadow-sm p-8 space-y-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">{t.newPassword}</h1>
        <div className="space-y-1.5">
          <Label htmlFor="pw">{t.newPassword}</Label>
          <Input id="pw" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" />
        </div>
        <Button type="submit" className="w-full h-11" disabled={loading}>{t.savePassword}</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
