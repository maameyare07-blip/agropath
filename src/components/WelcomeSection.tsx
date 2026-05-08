import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROFILE_IMG = "https://cdn.phototourl.com/member/2026-04-04-215aadad-fe88-4068-996e-868ec3072992.jpg";

const WelcomeSection = () => (
  <section id="welcome" className="relative py-20 lg:py-32 overflow-hidden bg-background">
    {/* Subtle organic pattern */}
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    />
    <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
    <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-8"
          >
            <Leaf className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-semibold tracking-[0.15em] uppercase">A Personal Note</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-8"
          >
            Welcome to <span className="text-primary">AgroPath</span>.
          </motion.h2>

          <div className="space-y-5 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
            {[
              <>I am <strong className="text-foreground font-semibold">Mohamed Mohamud SH Hassan</strong>, an Agricultural Scientist and Plant Pathology Specialist passionate about advancing sustainable agriculture, strengthening food security systems, and promoting science-driven agricultural solutions.</>,
              <>My work focuses on agricultural research, seed quality assurance, plant disease management, and climate-smart farming practices aimed at supporting farmers, institutions, and agricultural development initiatives.</>,
              <>Through research, education, and field-based agricultural systems, I strive to contribute to resilient farming communities and sustainable crop production for future generations.</>,
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.12 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 pl-5 border-l-2 border-primary/40"
          >
            <p
              className="text-2xl text-foreground/90 mb-1"
              style={{ fontFamily: "'Cormorant Garamond', 'Outfit', serif", fontStyle: "italic", fontWeight: 500 }}
            >
              Mohamed M. SH Hassan
            </p>
            <p className="text-xs text-muted-foreground tracking-wider uppercase">Founder & CEO, PathoSolutions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-8"
          >
            <Button
              size="lg"
              asChild
              className="group bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-7 h-12 shadow-lg shadow-primary/20"
            >
              <a href="#about">
                Learn More About Me
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right: Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative max-w-sm mx-auto lg:max-w-none">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[2rem] blur-2xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary/40 rounded-br-3xl" />
            <img
              src={PROFILE_IMG}
              alt="Mohamed Mohamud SH Hassan — Plant Pathology Specialist"
              className="relative rounded-3xl shadow-2xl object-cover w-full aspect-[4/5]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default WelcomeSection;
