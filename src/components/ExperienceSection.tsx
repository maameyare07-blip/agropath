import { motion } from "framer-motion";
import { Briefcase, Award, Rocket } from "lucide-react";

const experiences = [
  {
    icon: Briefcase,
    title: "Seed Inspector",
    org: "Somali Agricultural Regulatory and Inspection Services (SARIS)",
    date: "September 2025 – Present",
    isCurrent: true,
    isLeadership: false,
    achievements: [
      "Certified 50+ seed varieties for national distribution",
      "Ensured regulatory compliance with international phytosanitary standards",
      "Performed field and laboratory quality assessments for seed integrity",
      "Provided strategic advisory to the Ministry of Agriculture on seed policy",
    ],
  },
  {
    icon: Rocket,
    title: "Founder & CEO",
    org: "PathoSolutions",
    date: "2024 – Present",
    isCurrent: true,
    isLeadership: true,
    achievements: [
      "Scaled agricultural innovation platform to 500+ farmers served",
      "Developed and managed an agricultural blog and knowledge platform",
      "Cultivated strategic partnerships with international organizations",
      "Promoted evidence-based plant disease management solutions",
    ],
  },
  {
    icon: Award,
    title: "Lecturer & Research Supervisor",
    org: "Afgoye International University, Somalia",
    date: "April 2025 – September 2025",
    isCurrent: false,
    isLeadership: false,
    achievements: [
      "Mentored 10+ students in plant pathology and crop protection",
      "Supervised student research projects in sustainable agriculture",
      "Modernized curriculum to align with global agricultural standards",
      "Introduced evidence-based teaching methodologies",
    ],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-20 lg:py-28">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Career Journey</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">Professional Experience</h2>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title + exp.org}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative sm:pl-16"
            >
              {/* Timeline dot */}
              <div className="hidden sm:flex absolute left-4 top-6 w-5 h-5 rounded-full border-2 border-primary bg-card items-center justify-center">
                {exp.isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-slow" />}
              </div>

              <div className={`rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow ${
                exp.isLeadership
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card border-border"
              }`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <exp.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-bold text-lg text-foreground">{exp.title}</h3>
                  {exp.isCurrent && (
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary">Current</span>
                  )}
                  {exp.isLeadership && (
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-accent/10 text-accent">Leadership</span>
                  )}
                </div>
                <p className="text-muted-foreground font-medium mb-1">{exp.org}</p>
                <p className="text-sm text-muted-foreground mb-4">{exp.date}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
