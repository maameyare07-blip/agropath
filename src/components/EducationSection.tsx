import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Microscope, ShieldCheck, Leaf } from "lucide-react";

const degrees = [
  {
    degree: "Master of Science (Agri.) in Plant Pathology",
    institution: "Lovely Professional University (LPU), Punjab, India",
    year: "2024",
    thesis: "Management of Curvularia Leaf Spot of Maize Using Bio-Control Agents and Fungicides",
    specializations: ["Integrated Pest Management", "Bio-control agents", "Fungicides", "Agricultural research"],
    impact: "Advanced sustainable crop protection strategies, reducing chemical dependency through biological alternatives — contributing to climate-resilient food production.",
  },
  {
    degree: "Bachelor of Science in Agriculture",
    institution: "International University of Business Agriculture and Technology (IUBAT), Dhaka, Bangladesh",
    year: "2021",
    thesis: "Identification of Rice Genotypes for Flash Flood Submergence Tolerance",
    specializations: ["Sustainable agriculture", "Research techniques", "Pest and disease management"],
    impact: "Strengthened food security research on staple crops, identifying flood-tolerant rice genotypes vital for safeguarding production against extreme weather events.",
  },
];

const EducationSection = () => (
  <section id="education" className="py-14 lg:py-20 bg-secondary/30">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Academic Foundation</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">Education</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {degrees.map((d, i) => (
          <motion.div
            key={d.degree}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground">{d.year}</span>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-xs text-primary font-medium">Verified</span>
                </div>
              </div>
            </div>

            <h3 className="font-heading font-bold text-lg text-foreground mb-1">{d.degree}</h3>
            <p className="text-sm text-muted-foreground mb-5">{d.institution}</p>

            {/* Thesis */}
            <div className="border-l-2 border-primary pl-4 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <Microscope className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase">Research Thesis</span>
              </div>
              <p className="text-sm text-foreground font-semibold italic">{d.thesis}</p>
            </div>

            {/* Specializations */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase">Specialization</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {d.specializations.map((s) => (
                  <span key={s} className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">{s}</span>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div className="bg-primary/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase">Impact & Resilience</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.impact}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EducationSection;
