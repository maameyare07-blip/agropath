import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";

const PHOTO = "https://cdn.phototourl.com/free/2026-04-04-1559576d-37d1-42ac-986d-0dfaa8b2383e.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
    <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Plant Pathology Specialist | Seed Inspector
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Advancing Sustainable Agriculture{" "}
            <span className="text-primary">Through Science</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
            Plant Pathology Specialist and Seed Inspector improving crop health
            and food security in Somalia. Founder & CEO of PathoSolutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-lg"
            >
              <Mail className="w-5 h-5" /> Contact Me
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold text-base hover:bg-primary/5 transition-colors"
            >
              View My Work <ArrowDown className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-72 h-72 sm:w-96 sm:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-slow" />
            <img
              src={PHOTO}
              alt="Mohamed Mohamud SH Hassan"
              className="relative w-full h-full object-cover rounded-full border-4 border-card shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
