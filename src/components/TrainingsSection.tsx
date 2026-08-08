import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, FileText, MapPin, Users } from "lucide-react";

import TrainingGallery from "./TrainingGallery";
import certUnsdcf from "@/assets/certificates/United_Nations_Sustainable_Development_Cooperation_Framework.pdf.asset.json";
import certClimate from "@/assets/certificates/Climate_Change_Peace_and_Security_Understanding_Climate_Related_Security_Risks.pdf.asset.json";
import certPrimer from "@/assets/certificates/Foundational_Primer_on_the_2030_Agenda_for_Sustainable_Development.pdf.asset.json";
import certDrr from "@/assets/certificates/Synergizing_Disaster_Risk_Reduction_and_Climate_Change_Adaptation_Thought_Leadership_Course.pdf.asset.json";
import certPce from "@/assets/certificates/Conducting_a_Phytosanitary_Capacity_Evaluation_PCE.pdf.asset.json";
import g1 from "@/assets/gallery/1.jpeg.asset.json";
import g1a from "@/assets/gallery/1a.jpeg.asset.json";
import g1b from "@/assets/gallery/1b.jpeg.asset.json";
import g2 from "@/assets/gallery/2.jpeg.asset.json";
import g2a from "@/assets/gallery/2a.jpeg.asset.json";
import g2b from "@/assets/gallery/2b.jpeg.asset.json";
import g2c from "@/assets/gallery/2c.jpeg.asset.json";
import g2d from "@/assets/gallery/2d.jpeg.asset.json";
import g2e from "@/assets/gallery/2e.jpeg.asset.json";
import g2f from "@/assets/gallery/2f.jpeg.asset.json";
import g2g from "@/assets/gallery/2g.jpeg.asset.json";
import g2h from "@/assets/gallery/2h.jpeg.asset.json";
import g2i from "@/assets/gallery/2i.jpeg.asset.json";
import g2j from "@/assets/gallery/2j.jpeg.asset.json";
import g3 from "@/assets/gallery/3.jpeg.asset.json";
import f11 from "@/assets/gallery/11-2.jpeg.asset.json";
import f12 from "@/assets/gallery/12-2.jpeg.asset.json";
import f13 from "@/assets/gallery/13-2.jpeg.asset.json";
import f14 from "@/assets/gallery/14.jpeg.asset.json";
import f15 from "@/assets/gallery/15.jpeg.asset.json";
import f16 from "@/assets/gallery/16.jpeg.asset.json";


type TrainingCategory = "facilitated" | "attended" | "course";

type Training = {
  title: string;
  provider: string;
  providerUrl?: string;
  date: string;
  note?: string;
  photoUrl?: string;
  url?: string;
  certificateUrl?: string;
  gallery?: string[];
  role?: string;
  coFacilitators?: string[];
  venue?: string;
  submittedTo?: string;
  supportedBy?: string;
  category: TrainingCategory;
};

const trainings: Training[] = [
  {
    title: "Seed Quality Assurance & Certification Standards Training",
    provider: "Somali Agricultural Regulatory and Inspection Services (SARIS)",
    role: "Lead Facilitator",
    coFacilitators: ["Hussein Mohamed Qasim"],
    venue: "Afgooye District, South West State, Somalia",
    date: "04–06 August 2026",
    submittedTo: "Somali Agricultural Regulatory and Inspection Services (SARIS)",
    supportedBy: "FAO and Green Climate Fund (GCF)",
    gallery: [f11.url, f12.url, f13.url, f14.url, f15.url, f16.url],
    category: "facilitated",
  },

  {
    title: "Training on Seed Quality Assurance and Certification Standards (Training of Trainers - ToT)",
    provider: "Food and Agriculture Organization of the United Nations (FAO) & Somali Agricultural Regulatory & Inspection Service (SARIS)",
    date: "28–30 July 2026, Mogadishu",
    gallery: [g2.url, g2a.url, g2b.url, g2c.url, g2d.url, g2e.url, g2f.url, g2g.url, g2h.url, g2i.url, g2j.url],
    category: "attended",
  },
  {
    title: "SARIS Seed Certification and Traceability System",
    provider: "SARIS HQ",
    date: "14–16 July 2026, Mogadishu",
    gallery: [g3.url],
    category: "attended",
  },
  {
    title: "Refresher Training of Trainers (ToT) on Phytosanitary Measures and Integrated Production and Pest Management (IPPM) Principles",
    provider: "SARIS",
    date: "14–16 February 2026, Mogadishu",
    category: "attended",
  },
  {
    title: "Seed Production and Certification ToT Training Workshop",
    provider: "SARIS",
    date: "21–25 September 2025, Mogadishu",
    gallery: [g1.url, g1a.url, g1b.url],
    category: "attended",
  },
  {
    title: "Conducting a Phytosanitary Capacity Evaluation (PCE)",
    provider: "FAO eLearning Academy / IPPC",
    date: "11 May 2026",
    certificateUrl: certPce.url,
    category: "course",
  },
  {
    title: "United Nations Sustainable Development Cooperation Framework",
    provider: "UN System Staff College / UN Sustainable Development Group",
    date: "22 November 2023",
    note: "8 study hours",
    certificateUrl: certUnsdcf.url,
    category: "course",
  },
  {
    title: "Climate Change, Peace and Security: Understanding Climate-Related Security Risks Through an Integrated Lens",
    provider: "UNITAR / UN CC:Learn / UNEP / UN Women / UNDPPA / UNDP / adelphi",
    date: "27 November 2023",
    certificateUrl: certClimate.url,
    category: "course",
  },
  {
    title: "Foundational Primer on the 2030 Agenda for Sustainable Development (SDG Primer)",
    provider: "UN System Staff College",
    date: "26 November 2023",
    certificateUrl: certPrimer.url,
    category: "course",
  },
  {
    title: "Synergizing Disaster Risk Reduction and Climate Change Adaptation – Thought Leadership Course",
    provider: "UN System Staff College (UNSSC) & UNDRR",
    date: "",
    certificateUrl: certDrr.url,
    category: "course",
  },
];

const trainingGroups: { category: TrainingCategory; heading: string }[] = [
  { category: "facilitated", heading: "Trainings Facilitated" },
  { category: "attended", heading: "Trainings Attended" },
  { category: "course", heading: "Courses Completed" },
];


const TrainingCard = ({ training, index }: { training: Training; index: number }) => {

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Award className="w-6 h-6 text-primary" />
        </div>
        {training.date && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/60 px-3 py-1 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {training.date}
          </span>
        )}
      </div>

      <h3 className="font-heading font-bold text-xl text-foreground mb-2 leading-snug">
        {training.title}
      </h3>

      {training.role && (
        <p className="text-sm text-muted-foreground flex items-start gap-1.5">
          <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <span>
            <span className="font-semibold text-foreground">{training.role}</span>
            {training.coFacilitators?.length
              ? ` — with co-facilitator ${training.coFacilitators.join(", ")}`
              : ""}
          </span>
        </p>
      )}

      {training.venue && (
        <p className="text-sm text-muted-foreground flex items-start gap-1.5 mt-1.5">
          <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          {training.venue}
        </p>
      )}

      {!training.role && (
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
      )}

      {(training.submittedTo || training.supportedBy) && (
        <div className="mt-3 grid gap-1 text-sm text-muted-foreground">
          {training.submittedTo && (
            <p>
              <span className="font-semibold text-foreground">Submitted to:</span>{" "}
              {training.submittedTo}
            </p>
          )}
          {training.supportedBy && (
            <p>
              <span className="font-semibold text-foreground">Supported by:</span>{" "}
              {training.supportedBy}
            </p>
          )}
        </div>
      )}

      {training.gallery && (
        <TrainingGallery images={training.gallery} title={training.title} />
      )}

      {training.certificateUrl && (
        <a
          href={training.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 min-h-[44px]"
        >
          <FileText className="w-4 h-4" />
          View Certificate
        </a>
      )}

    </motion.article>
  );
};


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

      <div className="grid gap-12">
        {trainingGroups.map((group) => {
          const groupTrainings = trainings.filter((t) => t.category === group.category);
          return (
            <div key={group.category}>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">
                {group.heading}
              </h3>
              <div className="grid gap-6">
                {groupTrainings.map((training, i) => (
                  <TrainingCard key={training.title} training={training} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TrainingsSection;
