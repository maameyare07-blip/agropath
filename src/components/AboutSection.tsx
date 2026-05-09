import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Rocket,
  BookOpen,
  Users,
  FlaskConical,
  Globe2,
} from "lucide-react";

const timeline = [
  {
    icon: Briefcase,
    role: "Seed Inspector",
    org: "Somali Agricultural Regulatory and Inspection Services (SARIS)",
    note: "Seed quality assurance, regulatory compliance, and agricultural standards development.",
  },
  {
    icon: GraduationCap,
    role: "Lecturer — Department of Agriculture",
    org: "Afgoye International University",
    note: "Teaching plant pathology and supporting agricultural education initiatives.",
  },
  {
    icon: Rocket,
    role: "Founder & CEO",
    org: "PathoSolutions",
    note: "Plant disease management, knowledge dissemination, and collaborative research.",
  },
];

const stats = [
  { icon: FlaskConical, value: "5+", label: "Research Areas" },
  { icon: Users, value: "10+", label: "Workshops" },
  { icon: BookOpen, value: "12+", label: "Publications" },
  { icon: Globe2, value: "8+", label: "Collaborations" },
];

const AboutSection = () => (
  <section id="about" className="py-20 lg:py-28 bg-secondary/30 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mb-16"
      >
        <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">
          About — Academic & Research Background
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 leading-tight">
          Professional Profile
        </h2>
        <div className="mt-5 h-1 w-16 bg-primary rounded-full" />
      </motion.div>

      {/* Two-column biography */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-5 text-muted-foreground text-base sm:text-lg leading-relaxed"
        >
          <p>
            I am a dedicated agricultural scientist specializing in <strong className="text-foreground">plant pathology</strong>, <strong className="text-foreground">seed inspection</strong>, and <strong className="text-foreground">sustainable agricultural systems</strong>. My professional experience combines scientific research, field-based agricultural practice, and agricultural education to support resilient and productive farming systems.
          </p>
          <p>
            Currently, I serve as a <strong className="text-foreground">Seed Inspector at Somali Agricultural Regulatory and Inspection Services (SARIS)</strong>, where I contribute to seed quality assurance, regulatory compliance, and agricultural standards development.
          </p>
          <p>
            I also have academic experience as a <strong className="text-foreground">Lecturer in the Department of Agriculture</strong>, where I taught plant pathology and supported agricultural education initiatives for university students.
          </p>
          <p>
            As <strong className="text-foreground">Founder & CEO of PathoSolutions</strong>, I lead an agricultural innovation platform focused on plant disease management, agricultural knowledge dissemination, and collaborative research initiatives with national and international stakeholders.
          </p>
        </motion.div>

        {/* Academic credentials card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl bg-card border border-border p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg">Academic Training</h3>
            </div>
            <div className="space-y-5">
              <div className="pl-4 border-l-2 border-primary/40">
                <p className="font-semibold text-foreground">Lovely Professional University</p>
                <p className="text-sm text-muted-foreground">India — Advanced Plant Pathology</p>
              </div>
              <div className="pl-4 border-l-2 border-accent/50">
                <p className="font-semibold text-foreground">IUBAT</p>
                <p className="text-sm text-muted-foreground">
                  International University of Business Agriculture and Technology, Bangladesh
                </p>
              </div>
            </div>
            <p className="mt-6 pt-5 border-t border-border text-sm text-muted-foreground italic">
              Long-term vision: contributing to agricultural transformation and food security through research, innovation, education, and scientific collaboration.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Experience highlights timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-6">Experience Highlights</p>
        <div className="grid md:grid-cols-3 gap-5">
          {timeline.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative rounded-2xl bg-card border border-border p-6 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-primary to-accent rounded-b opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-heading font-bold text-foreground mb-1.5 leading-snug">{item.role}</h4>
              <p className="text-sm text-primary font-medium mb-3">{item.org}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.note}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-10 shadow-xl"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-foreground/15 mb-3">
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-bold text-primary-foreground">{s.value}</div>
              <div className="text-primary-foreground/80 text-sm mt-1 font-medium tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
