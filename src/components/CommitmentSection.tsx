import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Wheat, CloudSun, ShieldCheck, Sprout, FlaskConical, Users, Heart } from "lucide-react";

const commitments = [
  { icon: Wheat, title: "Food Security", text: "Supporting food security initiatives across communities." },
  { icon: CloudSun, title: "Climate-Smart Agriculture", text: "Advancing practices resilient to a changing climate." },
  { icon: ShieldCheck, title: "Crop Protection", text: "Promoting sustainable plant disease management." },
  { icon: Sprout, title: "Seed Certification", text: "Strengthening seed quality and certification systems." },
  { icon: FlaskConical, title: "Research-Driven Solutions", text: "Delivering evidence-based agricultural solutions." },
  { icon: Users, title: "Community Empowerment", text: "Empowering farmers through education and innovation." },
];

const stats = [
  { value: 50, suffix: "+", label: "Field Inspections" },
  { value: 3, suffix: "+", label: "Research Projects" },
  { value: 1000, suffix: "+", label: "Farmers Reached" },
  { value: 6, suffix: "", label: "Core Commitments" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v + suffix;
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const CommitmentSection = () => (
  <section id="commitment" className="relative py-20 lg:py-28 bg-foreground text-background overflow-hidden">
    {/* Background illustrations */}
    <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
      <Wheat className="absolute top-10 left-10 w-40 h-40 text-primary" />
      <Sprout className="absolute bottom-10 right-10 w-48 h-48 text-primary" />
      <Leaf className="absolute top-1/2 left-1/3 w-32 h-32 text-primary" />
    </div>
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-3xl pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Driven by Purpose</span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-3 mb-6">My Commitment</h2>
        <p className="text-background/70 text-lg leading-relaxed">
          I am committed to promoting sustainable agriculture and scientific excellence through practical
          agricultural solutions, plant disease management, seed quality systems, and farmer-centered innovation.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center p-6 rounded-2xl bg-background/5 border border-background/10 backdrop-blur-sm"
          >
            <div className="font-heading text-4xl sm:text-5xl font-bold text-primary mb-1">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="text-background/70 text-sm uppercase tracking-wider">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Commitment cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {commitments.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative rounded-2xl p-6 bg-background/5 border border-background/10 hover:border-primary/50 transition-all hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)] backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <c.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{c.title}</h3>
            <p className="text-background/70 text-sm leading-relaxed">{c.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto text-center p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-primary/15 to-transparent border border-primary/30"
      >
        <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
        <p className="font-heading text-xl sm:text-2xl leading-relaxed text-background/90 italic">
          "Every research project, field inspection, and educational initiative I undertake is guided by a
          commitment to agricultural sustainability, scientific integrity, and positive community impact."
        </p>
      </motion.div>
    </div>
  </section>
);

// Local import to avoid name collision in JSX background
import { Leaf } from "lucide-react";

export default CommitmentSection;
