import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How can I request a seed inspection or certification?",
    a: "Reach out via the Contact section with details of your seed lot or farm. I'll guide you through the process in line with SARIS certification standards.",
  },
  {
    q: "Do you offer plant disease diagnosis for individual farmers, or only institutions?",
    a: "Both — I work with individual farmers, seed producers, and institutions on plant disease identification and management.",
  },
  {
    q: "Are you available for training/workshop facilitation?",
    a: "Yes. I've facilitated Training of Trainers (ToT) and cascade trainings with SARIS and FAO, and I'm open to similar engagements with other organizations.",
  },
  {
    q: "Can I collaborate with you on a research article or review paper?",
    a: "Absolutely — I'm actively seeking co-authors in plant pathology, seed science, and food security. Reach out via the Contact section.",
  },
  {
    q: "How quickly do you respond to inquiries?",
    a: "I aim to respond within a few business days.",
  },
  {
    q: "Do you offer consulting remotely, or only in-person in Somalia?",
    a: "Primarily in-person within Somalia, though I'm open to remote consulting depending on the scope of the request.",
  },
];

const FAQSection = () => (
  <section id="faq" className="py-14 lg:py-20 bg-secondary/30">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Good to Know
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
          Frequently Asked Questions
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-2xl border border-border shadow-sm p-2 sm:p-4"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-heading font-semibold text-foreground min-h-[44px] px-3">
                <span className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-3 pl-11 text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
