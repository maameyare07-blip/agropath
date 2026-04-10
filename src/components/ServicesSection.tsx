import { motion } from "framer-motion";
import { Search, ShieldCheck, MessageSquare, Users } from "lucide-react";

const services = [
  { icon: Search, title: "Plant Disease Diagnosis", desc: "Accurate identification and management of crop diseases using evidence-based diagnostic methods." },
  { icon: ShieldCheck, title: "Seed Inspection & Certification", desc: "Comprehensive seed quality assurance aligned with national and international standards." },
  { icon: MessageSquare, title: "Agricultural Consulting", desc: "Strategic advisory on crop protection, pest management, and sustainable farming practices." },
  { icon: Users, title: "Farmer Training & Capacity Building", desc: "Hands-on workshops and knowledge transfer programs for farming communities." },
];

const ServicesSection = () => (
  <section id="services" className="py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">What I Offer</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">Services</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <s.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
