import { motion } from "framer-motion";
import { ShieldCheck, Target, Globe } from "lucide-react";

const PHOTO_1 = "https://cdn.phototourl.com/member/2026-04-04-9c212ae8-dbb0-4137-9008-e06d5e6524cf.jpg";
const PHOTO_2 = "https://cdn.phototourl.com/member/2026-04-04-215aadad-fe88-4068-996e-868ec3072992.jpg";

const highlights = [
  { icon: ShieldCheck, title: "Regulatory Expertise", text: "Certified seed inspector ensuring compliance with national and international phytosanitary standards." },
  { icon: Target, title: "Research-Driven", text: "Evidence-based approach to plant disease management, integrating bio-control agents and sustainable practices." },
  { icon: Globe, title: "Global Impact", text: "Aligned with UN SDG 2: Zero Hunger — committed to food security and climate-resilient agriculture in the Horn of Africa." },
];

const AboutSection = () => (
  <section id="about" className="py-20 lg:py-28 bg-secondary/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Professional Profile</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">About Me</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src={PHOTO_2} alt="Agricultural work" className="rounded-2xl shadow-lg object-cover w-full max-w-md mx-auto aspect-[3/4]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            I am a dedicated agricultural scientist with specialized expertise in <strong className="text-foreground">plant pathology</strong> and <strong className="text-foreground">seed inspection</strong>. With hands-on experience in disease diagnostics, regulatory compliance, and farmer capacity building, I work at the intersection of science and practice to strengthen food systems across Somalia.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            As <strong className="text-foreground">Founder & CEO of PathoSolutions</strong>, I lead an agricultural innovation platform focused on plant disease management, knowledge dissemination, and strategic partnerships with national and international stakeholders.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            My academic training at <strong className="text-foreground">Lovely Professional University (India)</strong> and <strong className="text-foreground">IUBAT (Bangladesh)</strong> has equipped me with advanced research capabilities in integrated pest management, bio-control agents, and climate-smart agriculture.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {highlights.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
