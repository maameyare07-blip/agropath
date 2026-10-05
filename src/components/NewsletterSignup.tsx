import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address.").max(254);

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const subscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({ title: "Please check your email", description: parsed.error.issues[0]?.message, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("subscribers").insert({ email: parsed.data });
    setSubmitting(false);

    if (error?.code === "23505") {
      toast({ title: "You're already subscribed!" });
      return;
    }
    if (error) {
      toast({ title: "Subscription failed", description: "Please try again in a moment.", variant: "destructive" });
      return;
    }

    setEmail("");
    toast({ title: "Thanks! You'll hear about new publications, trainings, and articles." });
  };

  return (
    <div className="w-full max-w-xl border-y border-background/10 py-7 mb-7">
      <div className="flex items-center justify-center gap-2 text-background mb-2">
        <Mail className="h-5 w-5 text-brand-gold" aria-hidden="true" />
        <h2 className="font-heading text-lg font-semibold">Get Updates</h2>
      </div>
      <p className="text-background/60 text-sm mb-4">New publications, trainings, and articles—sent occasionally.</p>
      <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2" noValidate>
        <label htmlFor="updates-email" className="sr-only">Email address</label>
        <Input
          id="updates-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-11 bg-background text-foreground"
        />
        <Button type="submit" className="h-11 shrink-0" disabled={submitting}>
          {submitting && <Loader2 className="animate-spin" aria-hidden="true" />}
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;