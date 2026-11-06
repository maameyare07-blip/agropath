import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Activity, BookOpen, Mail, MessageSquare, Sprout, Users, RefreshCw, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useFarmerLang, useText } from "@/lib/farmerI18n";

export default function AdminOverview() {
  const text = useText();
  const { lang } = useFarmerLang();
  const stats = useQuery({ queryKey: ["admin-stats"], queryFn: async () => {
    const { data, error } = await supabase.rpc("admin_stats");
    if (error) throw error;
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid statistics");
    return data;
  }});
  const count = (key: string) => {
    const value = stats.data?.[key];
    return typeof value === "number" ? value.toLocaleString(lang) : "—";
  };
  const cards = [
    { title: "Testimonials", icon: MessageSquare, to: "/admin/testimonials", values: [["Approved", "testimonials_approved"], ["Pending", "testimonials_pending"], ["Rejected", "testimonials_rejected"]] },
    { title: "Subscribers", icon: Mail, to: "/admin/subscribers", values: [["Total", "subscribers"]] },
    { title: "Published content", icon: BookOpen, to: "/admin/content", values: [["Published", "content_published"], ["Draft", "content_draft"]] },
    { title: "Crop Doctor", icon: Sprout, to: "/admin/diagnoses", values: [["Total", "diagnoses_total"], ["Last 7 days", "diagnoses_week"]] },
    { title: "Farmer accounts", icon: Users, values: [["Registered", "farmers"]] },
    { title: "Site health", icon: Activity, to: "/admin/errors", values: [["Errors · last 7 days", "errors_week"]] },
  ];
  return <main>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8"><h1 className="font-heading text-3xl font-bold">{text("Overview")}</h1><Button variant="outline" disabled={stats.isFetching} onClick={() => void stats.refetch()}><RefreshCw />{text("Refresh")}</Button></div>
    {stats.isPending ? <Loader2 className="animate-spin text-primary" aria-label={text("Loading")} /> : stats.isError ? <div role="alert"><p>{text("Unable to load dashboard")}</p><Button className="mt-4" onClick={() => void stats.refetch()}>{text("Retry")}</Button></div> : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map(card => <article key={card.title} className="border border-border rounded-lg bg-card p-5 min-w-0">
        <div className="flex items-center justify-between gap-3 mb-5"><h2 className="font-heading font-semibold text-lg">{card.to ? <Link to={card.to} className="hover:text-primary underline-offset-4 hover:underline">{text(card.title)}</Link> : text(card.title)}</h2><card.icon className="w-5 h-5 text-primary shrink-0" /></div>
        <dl className="flex flex-wrap gap-x-6 gap-y-4">{card.values.map(([label, key]) => <div key={key}><dd className="font-heading text-3xl font-bold tabular-nums">{count(key)}</dd><dt className="text-sm text-muted-foreground mt-1">{text(label)}</dt></div>)}</dl>
      </article>)}
    </div>}
  </main>;
}