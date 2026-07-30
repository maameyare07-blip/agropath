import { motion } from "framer-motion";
import { Award, Calendar, FileText } from "lucide-react";
import certUnsdcf from "@/assets/certificates/United_Nations_Sustainable_Development_Cooperation_Framework.pdf.asset.json";
import certClimate from "@/assets/certificates/Climate_Change_Peace_and_Security_Understanding_Climate_Related_Security_Risks.pdf.asset.json";
import certPrimer from "@/assets/certificates/Foundational_Primer_on_the_2030_Agenda_for_Sustainable_Development.pdf.asset.json";
import certDrr from "@/assets/certificates/Synergizing_Disaster_Risk_Reduction_and_Climate_Change_Adaptation_Thought_Leadership_Course.pdf.asset.json";
import certPce from "@/assets/certificates/Conducting_a_Phytosanitary_Capacity_Evaluation_PCE.pdf.asset.json";

type Training = {
  title: string;
  provider: string;
  providerUrl?: string;
  date: string;
  note?: string;
  photoUrl?: string;
  url?: string;
  certificateUrl?: string;
};

const trainings: Training[] = [
  {
    title: "United Nations Sustainable Development Cooperation Framework",
    provider: "UN System Staff College / UN Sustainable Development Group",
    date: "22 November 2023",
    note: "8 study hours",
    certificateUrl: certUnsdcf.url,
  },
  {
    title: "Climate Change, Peace and Security: Understanding Climate-Related Security Risks Through an Integrated Lens",
    provider: "UNITAR / UN CC:Learn / UNEP / UN Women / UNDPPA / UNDP / adelphi",
    date: "27 November 2023",
    certificateUrl: certClimate.url,
  },
  {
    title: "Foundational Primer on the 2030 Agenda for Sustainable Development (SDG Primer)",
    provider: "UN System Staff College",
    date: "26 November 2023",
    certificateUrl: certPrimer.url,
  },
  {
    title: "Synergizing Disaster Risk Reduction and Climate Change Adaptation – Thought Leadership Course",
    provider: "UN System Staff College (UNSSC) & UNDRR",
    date: "",
    certificateUrl: certDrr.url,
  },
  {
    title: "Conducting a Phytosanitary Capacity Evaluation (PCE)",
    provider: "FAO eLearning Academy / IPPC",
    date: "11 May 2026",
    certificateUrl: certPce.url,
  },
];


const TrainingsSection = () => (
  <section id="trainings" className="py-14 lg:py-20">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Continuous Learning
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
          Trainings & Professional Development
        </h2>
      </motion.div>

      <div className="grid gap-6">
        {trainings.map((training, i) => (
          <motion.article
            key={training.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              {training.date && (
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {training.date}
                </span>
              )}
            </div>

            <h3 className="font-heading font-bold text-xl text-foreground mb-2 leading-snug">
              {training.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Provider:</span>{" "}
              {training.providerUrl ? (
                <a
                  href={training.providerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline underline-offset-2 transition-colors"
                >
                  {training.provider}
                </a>
              ) : (
                training.provider
              )}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default TrainingsSection;
