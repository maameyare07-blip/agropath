import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const trainings = [
  {
    title: "United Nations Sustainable Development Cooperation Framework",
    provider: "UN System Staff College / UN Sustainable Development Group",
  },
  {
    title: "Climate Change, Peace and Security: Understanding Climate-Related Security Risks Through an Integrated Lens",
    provider: "UNITAR / UN CC:Learn / UNEP / UN Women / UNDPPA / UNDP / adelphi",
  },
  {
    title: "Foundational Primer on the 2030 Agenda for Sustainable Development (SDG Primer)",
    provider: "UN System Staff College",
  },
  {
    title: "Synergizing Disaster Risk Reduction and Climate Change Adaptation – Thought Leadership Course",
    provider: "UN System Staff College (UNSSC) & UNDRR",
  },
  {
    title: "Conducting a Phytosanitary Capacity Evaluation (PCE)",
    provider: "FAO eLearning Academy / IPPC",
  },
];

const TrainingsPreviewSection = () => (
  <section id="trainings-preview" className="py-14 lg:py-20 bg-secondary/30">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Continuous Learning
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
          Trainings & Professional Development
        </h2>
      </motion.div>

      <div className="grid gap-4">
        {trainings.map((training, i) => (
          <motion.div
            key={training.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-card rounded-xl border border-border p-4 sm:p-5 shadow-sm flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground leading-snug">
                {training.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {training.provider}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-10 text-center"
      >
        <Link
          to="/trainings"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 min-h-[44px]"
        >
          View All Trainings
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default TrainingsPreviewSection;
