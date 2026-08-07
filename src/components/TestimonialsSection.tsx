import { motion } from "framer-motion";
import { Quote, MessageSquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type Testimonial = {
  id: string;
  full_name: string;
  position: string;
  organization: string;
  message: string;
  photo_url: string | null;
};

const initials = (name: string) =>
  name
    .replace(/Dr\.|Prof\.|Eng\.|Mr\.|Ms\./g, "")
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Card = ({ t }: { t: Testimonial }) => (
  <div className="group relative h-full bg-card rounded-2xl p-7 border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    <Quote className="w-9 h-9 text-primary/20 mb-4" />
    <p className="text-foreground/90 text-base leading-relaxed mb-6 whitespace-pre-wrap">"{t.message}"</p>
    <div className="flex items-center gap-4 pt-5 border-t border-border">
      {t.photo_url ? (
        <img
          src={t.photo_url}
          alt={t.full_name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-border"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-heading font-bold text-sm flex-shrink-0">
          {initials(t.full_name)}
        </div>
      )}
      <div className="min-w-0">
        <p className="font-heading font-semibold text-foreground leading-tight">{t.full_name}</p>
        <p className="text-xs text-primary font-medium mt-0.5">{t.position}</p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{t.organization}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any).rpc("get_approved_testimonials");

      setItems((data as Testimonial[]) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <section id="testimonials" className="py-14 lg:py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            What People Say
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            Professional Testimonials
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Feedback from colleagues, professionals, and collaborators in agriculture and plant health.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-muted-foreground py-10">Loading testimonials…</div>
        ) : items.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">
            No testimonials yet. Be the first to share your experience.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card t={t} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/testimonial">
              <MessageSquarePlus className="w-5 h-5" />
              Share Your Experience
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
