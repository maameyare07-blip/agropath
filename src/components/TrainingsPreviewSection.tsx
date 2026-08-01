import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

type TrainingCategory = "attended" | "course";

type Training = {
  title: string;
  provider: string;
  category: TrainingCategory;
};

const trainings: Training[] = [
  {
    title: "Training on Seed Quality Assurance and Certification Standards (Training of Trainers - ToT)",
    provider: "Food and Agriculture Organization of the United Nations (FAO) & Somali Agricultural Regulatory & Inspection Service (SARIS)",
    category: "attended",
  },
  {
    title: "SARIS Seed Certification and Traceability System",
    provider: "SARIS HQ",
    category: "attended",
  },
  {
    title: "Refresher Training of Trainers (ToT) on Phytosanitary Measures and Integrated Production and Pest Management (IPPM) Principles",
    provider: "SARIS",
    category: "attended",
  },
  {
    title: "Seed Production and Certification ToT Training Workshop",
    provider: "SARIS",
    category: "attended",
  },
  {
    title: "Conducting a Phytosanitary Capacity Evaluation (PCE)",
    provider: "FAO eLearning Academy / IPPC",
    category: "course",
  },
  {
    title: "United Nations Sustainable Development Cooperation Framework",
    provider: "UN System Staff College / UN Sustainable Development Group",
    category: "course",
  },
  {
    title: "Climate Change, Peace and Security: Understanding Climate-Related Security Risks Through an Integrated Lens",
    provider: "UNITAR / UN CC:Learn / UNEP / UN Women / UNDPPA / UNDP / adelphi",
    category: "course",
  },
  {
    title: "Foundational Primer on the 2030 Agenda for Sustainable Development (SDG Primer)",
    provider: "UN System Staff College",
    category: "course",
  },
  {
    title: "Synergizing Disaster Risk Reduction and Climate Change Adaptation – Thought Leadership Course",
    provider: "UN System Staff College (UNSSC) & UNDRR",
    category: "course",
  },
];

const trainingGroups: { category: TrainingCategory; heading: string }[] = [
  { category: "attended", heading: "Trainings Attended" },
  { category: "course", heading: "Courses Completed" },
];

const TrainingPreviewCard = ({ training, index }: { training: Training; index: number }) => (
  <motion.div
    key={training.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
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
);

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

      <div className="grid gap-10">
        {trainingGroups.map((group) => {
          const groupTrainings = trainings.filter((t) => t.category === group.category);
          return (
            <div key={group.category}>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                {group.heading}
              </h3>
              <div className="grid gap-4">
                {groupTrainings.map((training, i) => (
                  <TrainingPreviewCard key={training.title} training={training} index={i} />
                ))}
              </div>
            </div>
          );
        })}
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
