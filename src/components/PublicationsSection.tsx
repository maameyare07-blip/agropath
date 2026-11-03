import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { BookOpen, Calendar, FileText, Users } from "lucide-react";

import { usePublishedContent, safeContentUrl } from "@/lib/publishedContent";
import { Loader2 } from "lucide-react";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: "Plant Virus Transmission",
  name: "Plant Virus Transmission",
  datePublished: "2024",
  inLanguage: "en",
  author: [
    { "@type": "Person", name: "Meenakshi Rana" },
    { "@type": "Person", name: "Mohamed Mohamud SH Hassan" },
    { "@type": "Person", name: "Seweta Srivastava" },
  ],
  isPartOf: {
    "@type": "Book",
    name: "Plant Virology: Theoretical Concepts",
  },
  about: ["Plant virology", "Plant pathology", "Plant virus transmission"],
  url: "https://agropath.lovable.app/#publications",
};

const PublicationsSection = () => {
  const { data: publications = [], isPending, isError } = usePublishedContent("publication");
  return (
  <section id="publications" className="py-14 lg:py-20">
    <Helmet>
      {publications.some(pub => pub.title === "Plant Virus Transmission") && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
    </Helmet>
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
        {isPending && <Loader2 className="mx-auto animate-spin text-primary" />}
        {isError && <p className="text-center text-muted-foreground">Unable to load publications. Please try again later.</p>}
        {publications.map((pub, i) => (
          <motion.article
            key={pub.id}
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
                Book Chapter
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/15 text-accent-foreground border border-border uppercase tracking-wide">
                Co-Author
              </span>

              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {pub.publication_year}
              </span>
            </div>

            <h3 className="font-heading font-bold text-xl text-foreground mb-2 leading-snug">
              {pub.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              In{" "}
              <span className="italic text-foreground font-medium">{pub.in_book}</span>
            </p>

            <div className="flex items-start gap-2 mb-4 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>
                <span className="font-medium text-foreground">Authors: </span>
                {pub.authors.join("; ")}
              </span>
            </div>


            <p className="text-sm text-muted-foreground leading-relaxed">
              {pub.summary}
            </p>

            {safeContentUrl(pub.url) && (
              <a
                href={safeContentUrl(pub.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 min-h-[44px]"
              >
                <FileText className="w-4 h-4" />
                View Chapter
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
};

export default PublicationsSection;
