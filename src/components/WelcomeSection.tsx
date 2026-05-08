import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const WelcomeSection = () => (
  <section id="welcome" className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-background via-secondary/40 to-background">
    {/* Decorative glows */}
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }}
    />

    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-card/70 backdrop-blur-xl border border-primary/20 shadow-2xl"
      >
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-xl -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-semibold tracking-wide">A Personal Note</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-8"
        >
          Welcome to My Portfolio
        </motion.h2>

        <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
          {[
            <>I am <strong className="text-foreground">Mohamed Mohamud SH Hassan</strong>, an Agricultural Specialist and Plant Pathology Expert passionate about advancing sustainable agriculture, improving plant health, and strengthening food security systems through science-driven solutions.</>,
            <>My work combines agricultural research, seed quality assurance, plant disease management, and climate-smart agricultural practices aimed at supporting farmers, institutions, and agricultural development initiatives.</>,
            <>Through research, education, and field-based agricultural systems, I strive to contribute to resilient farming communities and sustainable crop production for future generations.</>,
          ].map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default WelcomeSection;
