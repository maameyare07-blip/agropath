import { motion } from "framer-motion";
import { BookOpen, Calendar, Users } from "lucide-react";

type Publication = {
  type: string;
  title: string;
  inBook: string;
  year: number;
  authors: string[];
  description: string;
  url?: string;
};

const publications: Publication[] = [
  {
    type: "Book Chapter",
    title: "Plant Virus Transmission",
    inBook: "Plant Virology: Theoretical Concepts",
    year: 2024,
    authors: ["Mohamed Mohamud SH Hassan"],
    description:
      "Contributed a chapter titled 'Plant Virus Transmission' to the book 'Plant Virology: Theoretical Concepts,' published in 2024. The chapter explores theoretical and practical aspects of plant virus transmission, providing insights into mechanisms and management strategies.",
  },
];

const PublicationsSection = () => (
  <section id="publications" className="py-14 lg:py-20">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Scholarly Contributions
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
          Publications
        </h2>
      </motion.div>

      <div className="grid gap-6">
        {publications.map((pub, i) => (
          <motion.article
            key={pub.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                {pub.type}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {pub.year}
              </span>
            </div>

            <h3 className="font-heading font-bold text-xl text-foreground mb-2 leading-snug">
              {pub.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              In{" "}
              <span className="italic text-foreground font-medium">{pub.inBook}</span>
            </p>

            <div className="flex items-start gap-2 mb-4 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{pub.authors.join(", ")}</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {pub.description}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default PublicationsSection;
