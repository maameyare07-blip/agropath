import { motion } from "framer-motion";
import { Bug, FlaskConical, BarChart3, Microscope, CloudSun } from "lucide-react";

const skills = [
  { icon: Bug, name: "Integrated Pest Management (IPM)" },
  { icon: FlaskConical, name: "Seed Quality Control" },
  { icon: BarChart3, name: "Data Analysis (R, SPSS)" },
  { icon: Microscope, name: "Agricultural Research" },
  { icon: CloudSun, name: "Climate-Smart Agriculture" },
];

const SkillsSection = () => (
  <section id="skills" className="py-20 lg:py-28 bg-secondary/30">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Technical Expertise</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">Skills</h2>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground leading-tight">{s.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
