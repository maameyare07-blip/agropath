import { motion } from "framer-motion";
import { FlaskConical, Users } from "lucide-react";

const projects = [
  {
    icon: FlaskConical,
    title: "Maize Disease Management Research",
    desc: "Comprehensive research on the management of Curvularia leaf spot of maize using bio-control agents and fungicides — contributing to sustainable crop protection and reduced chemical dependency.",
    tags: ["Bio-control", "Maize", "Plant Pathology"],
  },
  {
    icon: Users,
    title: "Agricultural Training & Farmer Support",
    desc: "Designed and delivered hands-on training programs for farming communities in Somalia, focusing on pest identification, seed selection, and climate-resilient practices.",
    tags: ["Capacity Building", "Farmer Training", "Food Security"],
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-20 lg:py-28">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Research & Impact</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">Featured Projects</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <p.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground mb-3">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
