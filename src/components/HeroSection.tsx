import { useText } from "@/lib/farmerI18n";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import img1 from "@/assets/gallery/1.jpeg.asset.json";
import img2 from "@/assets/gallery/1a.jpeg.asset.json";
import img3 from "@/assets/gallery/1b.jpeg.asset.json";
import img4 from "@/assets/gallery/3.jpeg.asset.json";

const SLIDES = [img1.url, img2.url, img3.url, img4.url];

const HeroSection = () => {
  const tr = useText();
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <section className="relative flex items-center pt-20 lg:pt-16 lg:min-h-[88vh] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="relative w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="text-center mb-6">
              <Wordmark className="block font-heading text-3xl sm:text-4xl font-bold tracking-tight" />
              <p className="mt-1.5 font-heading text-base sm:text-lg font-semibold text-brand-green">{tr("Mohamed Mohamud SH Hassan")}</p>
            </div>

            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">{tr("Plant Pathology Specialist | Seed Inspector | Agricultural Researcher")}</span>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">{tr("Advancing Sustainable Agriculture")}{" "}
              <span className="text-primary">{tr("Through Science")}</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8">{tr("A Plant Pathology Specialist and Seed Inspector dedicated to strengthening crop health, seed quality, and food security across Somalia. Founder & CEO of PathoSolutions, bridging scientific research with practical solutions for farmers and agricultural institutions.")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-lg"
              >
                <Mail className="w-5 h-5" />{tr("Contact Me")}</a>
              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold text-base hover:bg-primary/5 transition-colors"
              >{tr("View My Work")}<ArrowDown className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[26rem] lg:h-[26rem]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-slow" />
              <div className="relative w-full h-full rounded-full border-4 border-card shadow-2xl overflow-hidden bg-muted">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={index}
                    src={SLIDES[index]}
                    alt={tr("{title} — photo {number} of {total}", { title: "Mohamed Mohamud SH Hassan", number: index + 1, total: SLIDES.length })}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </AnimatePresence>
              </div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 border border-border shadow-sm">
                {SLIDES.map((_, i) => (
                  <Button variant="ghost" size="icon"
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={tr("Go to photo {number}", { number: i + 1 })}
                    aria-current={i === index}
                    className="h-11 w-11"
                  ><span className={`h-1.5 rounded-full ${i === index ? "w-4 bg-primary" : "w-1.5 bg-border"}`} /></Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
