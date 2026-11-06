import { Home, Sprout, Tractor, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useText } from "@/lib/farmerI18n";

export default function MobileFarmerNav() {
  const text = useText();
  const { pathname, hash } = useLocation();
  if (pathname.startsWith("/admin") || pathname.startsWith("/.lovable")) return null;
  const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/crop-doctor", label: "Crop Doctor", icon: Sprout },
    { to: "/farmer/dashboard", label: "My Farm", icon: Tractor },
    { to: "/#contact", label: "Contact", icon: Phone },
  ];
  return <nav aria-label={text("Farmer navigation")} className="mobile-farmer-nav fixed bottom-0 inset-x-0 z-40 grid grid-cols-4 border-t border-border bg-card md:hidden">
    {items.map(({ to, label, icon: Icon }) => {
      const active = to === "/" ? pathname === "/" && !hash : to === "/#contact" ? hash === "#contact" && pathname === "/" : pathname === to;
      return <Button key={to} asChild variant="ghost" className={`h-auto min-h-16 rounded-none px-1 py-2 flex-col gap-1 whitespace-normal text-xs ${active ? "text-primary bg-secondary" : "text-muted-foreground"}`}>
        <Link to={to} aria-current={active ? "page" : undefined}><Icon className="h-5 w-5 shrink-0" /><span className="leading-snug text-center">{text(label)}</span></Link>
      </Button>;
    })}
  </nav>;
}