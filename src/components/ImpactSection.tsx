import { motion } from "framer-motion";
import { Award, ClipboardCheck, GraduationCap, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Farmers reached" },
  { icon: ClipboardCheck, value: "50+", label: "Field inspections conducted" },
  {
    icon: GraduationCap,
    value: "16",
    label: "Participants trained (SARIS cascade training, Aug 2026)",
  },
  { icon: Award, value: "9", label: "Trainings & courses completed" },
];

const ImpactSection = () => (
  <section id="impact" className="py-14 lg:py-20 bg-secondary/30">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          By the Numbers
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
          Impact at a Glance
        </h2>
        <div className="mt-5 mx-auto h-1 w-16 bg-primary rounded-full" />
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden text-center"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mt-2 mb-4">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground mt-2 leading-snug">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
