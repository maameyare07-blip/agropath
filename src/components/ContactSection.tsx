import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PHONE = "252612330512";
const EMAIL = "maameyare07@gmail.com";

const inquiryTypes = [
  "Research Collaboration",
  "Agricultural Consulting",
  "Academic Partnership",
  "Development Project",
  "Training / Workshop",
  "Speaking Engagement",
  "General Inquiry",
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  inquiry: z.string().min(1, "Please select an inquiry type"),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", inquiry: "", message: "" });

  const buildMessage = () => {
    return `Hello Mohamed,%0A%0AName: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}%0AInquiry Type: ${encodeURIComponent(form.inquiry)}%0A%0A${encodeURIComponent(form.message)}`;
  };

  const validate = () => {
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({ title: "Please check the form", description: result.error.issues[0].message, variant: "destructive" });
      return false;
    }
    return true;
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    window.open(`https://wa.me/${PHONE}?text=${buildMessage()}`, "_blank", "noopener,noreferrer");
  };

  const sendEmail = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(`[${form.inquiry}] Portfolio Inquiry from ${form.name}`);
    const body = `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0AInquiry Type: ${form.inquiry}%0D%0A%0D%0A${encodeURIComponent(form.message)}`;
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">Contact Me</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Reach out directly via WhatsApp or email, or send a structured message below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <a href={`tel:+${PHONE}`} className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Call Me</p>
                <p className="font-semibold text-foreground">+252 612 330 512</p>
              </div>
            </a>

            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Me</p>
                <p className="font-semibold text-foreground">{EMAIL}</p>
              </div>
            </a>

            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <p className="font-semibold text-foreground">+252 612 330 512</p>
              </div>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm space-y-5"
            onSubmit={(e) => { e.preventDefault(); sendEmail(); }}
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input
                type="text"
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Inquiry Type</label>
              <Select value={form.inquiry} onValueChange={(v) => setForm({ ...form, inquiry: v })}>
                <SelectTrigger className="w-full h-12 px-4 rounded-xl bg-secondary border-border text-foreground">
                  <SelectValue placeholder="Select an inquiry type" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {inquiryTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                rows={4}
                maxLength={1000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                placeholder="How can I help you?"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                <Mail className="w-5 h-5" /> Send via Email
              </button>
              <button
                type="button"
                onClick={sendWhatsApp}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                <MessageCircle className="w-5 h-5" /> Send via WhatsApp
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center pt-1">
              Your message will open in your email client or WhatsApp — no data is stored.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
