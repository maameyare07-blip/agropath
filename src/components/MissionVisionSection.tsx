import { motion } from "framer-motion";
import { Target, Eye, Leaf, Lightbulb, Sprout, Users, FlaskConical, Globe2, CloudSun, GraduationCap } from "lucide-react";

const cards = [
  {
    icon: Target,
    label: "Mission",
    title: "My Mission",
    text: "To strengthen sustainable agricultural systems through scientific research, plant disease management, seed quality assurance, and climate-smart agricultural practices that improve food security, farmer resilience, and crop productivity.",
    listLabel: "Focus Areas",
    items: [
      { icon: Leaf, text: "Sustainable crop protection" },
      { icon: Lightbulb, text: "Agricultural innovation" },
      { icon: Sprout, text: "Seed system improvement" },
      { icon: Users, text: "Farmer empowerment" },
      { icon: FlaskConical, text: "Research-based agricultural solutions" },
    ],
  },
  {
    icon: Eye,
    label: "Vision",
    title: "My Vision",
    text: "To become a leading agricultural scientist and plant pathology expert contributing to global agricultural resilience, sustainable food systems, and advanced plant health solutions through innovation, education, and scientific collaboration.",
    listLabel: "Future Goals",
    items: [
      { icon: Globe2, text: "Support agricultural transformation in Africa" },
      { icon: FlaskConical, text: "Advance plant disease research" },
      { icon: CloudSun, text: "Promote climate-resilient agriculture" },
      { icon: GraduationCap, text: "Strengthen agricultural education and innovation" },
    ],
  },
];

const MissionVisionSection = () => (
  <section id="mission-vision" className="relative py-20 lg:py-28 bg-secondary/30 overflow-hidden">
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Purpose & Direction</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">Mission & Vision</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/40 via-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
            <div className="relative h-full rounded-3xl p-8 lg:p-10 bg-card/80 backdrop-blur-xl border border-border group-hover:border-primary/40 transition-colors shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
                  <card.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">{card.label}</span>
                  <h3 className="font-heading text-2xl font-bold text-foreground">{card.title}</h3>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{card.text}</p>

              <div>
                <h4 className="font-heading font-semibold text-foreground mb-3">{card.listLabel}</h4>
                <ul className="space-y-3">
                  {card.items.map((it) => (
                    <li key={it.text} className="flex items-start gap-3">
                      <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <it.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground/90">{it.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default MissionVisionSection;
