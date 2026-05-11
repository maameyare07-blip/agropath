import { motion } from "framer-motion";
import { Mail, FileText, Handshake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustItems = [
  "Research collaborations",
  "Agricultural consulting",
  "Academic partnerships",
  "Development projects",
  "Agricultural training initiatives",
  "International opportunities",
];

const particles = Array.from({ length: 18 });

const PartnerCTASection = () => (
  <section id="partner" className="relative py-24 lg:py-32 overflow-hidden bg-background">
    {/* Animated gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
    <motion.div
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      style={{
        backgroundImage:
          "linear-gradient(120deg, hsl(var(--primary)/0.25), transparent, hsl(var(--primary)/0.25))",
        backgroundSize: "200% 200%",
      }}
      className="absolute inset-0"
    />

    {/* Floating particles */}
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, i) => {
        const size = 4 + (i % 5) * 2;
        const left = (i * 53) % 100;
        const delay = (i % 6) * 0.7;
        const duration = 8 + (i % 5) * 2;
        return (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
            style={{ left: `${left}%`, width: size, height: size }}
            className="absolute bottom-0 rounded-full bg-primary/40 blur-[1px]"
          />
        );
      })}
    </div>

    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-card/60 backdrop-blur-2xl border border-primary/30 shadow-2xl text-center"
      >
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/40 via-transparent to-primary/40 blur-2xl -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-semibold tracking-wide">Let's Collaborate</span>
        </motion.div>

        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-6">
          Ready to Partner With Me?
        </h2>

        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
          Let's work together to advance sustainable agriculture, strengthen plant health systems, and build
          resilient food production solutions through research, innovation, and collaboration.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all"
          >
            <a href="#contact">
              <Mail className="w-5 h-5" />
              Contact Me
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-primary/40 hover:bg-primary/10 hover:scale-105 transition-all"
          >
            <a href="#" download>
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto hover:scale-105 transition-all"
          >
            <a href="#contact">
              <Handshake className="w-5 h-5" />
              Collaborate on Research
            </a>
          </Button>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Open To</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {trustItems.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full text-sm bg-background/60 border border-border text-foreground/80 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PartnerCTASection;
