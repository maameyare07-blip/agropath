import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

type Testimonial = {
  name: string;
  title: string;
  organization: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Dr. Abdirahman Yusuf",
    title: "Senior Agricultural Researcher",
    organization: "Somali Agricultural Research Institute",
    quote:
      "Mohamed's expertise in plant pathology and seed inspection has elevated the quality of our national seed certification process. A truly dedicated scientist.",
  },
  {
    name: "Prof. Halima Ahmed",
    title: "Lecturer & Agronomist",
    organization: "Afgoye International University",
    quote:
      "An exceptional educator and collaborator. His evidence-based teaching and field knowledge have inspired the next generation of agricultural professionals.",
  },
  {
    name: "Eng. Mahad Hassan",
    title: "Program Coordinator",
    organization: "FAO Somalia – e-Agriculture Network",
    quote:
      "Mohamed brings rigor, integrity, and a deep commitment to sustainable agriculture. His contributions to crop protection are tangible and impactful.",
  },
];

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
    <p className="text-foreground/90 text-base leading-relaxed mb-6">"{t.quote}"</p>
    <div className="flex items-center gap-4 pt-5 border-t border-border">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-heading font-bold text-sm flex-shrink-0">
        {initials(t.name)}
      </div>
      <div className="min-w-0">
        <p className="font-heading font-semibold text-foreground leading-tight">{t.name}</p>
        <p className="text-xs text-primary font-medium mt-0.5">{t.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{t.organization}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

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

        {/* Desktop / Tablet grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Card t={t} />
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t) => (
                <div key={t.name} className="flex-[0_0_88%] min-w-0 pl-4 first:pl-0">
                  <Card t={t} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === selected ? "w-8 bg-primary" : "w-2 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
