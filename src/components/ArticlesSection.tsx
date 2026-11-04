import { useText } from "@/lib/farmerI18n";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink } from "lucide-react";
import { usePublishedContent, safeContentUrl } from "@/lib/publishedContent";
import { Button } from "@/components/ui/button";
import { useText } from "@/lib/farmerI18n";

const ArticlesSection = () => {
  const tr = useText();
  const { data: articles = [] } = usePublishedContent("article");
  const text = useText();
  return (
  <section id="articles" className="py-14 lg:py-20 bg-secondary/30">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">{tr("Knowledge Sharing")}</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">{tr("PathoSolutions Blog")}</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">{tr("A platform where I share practical knowledge, research insights, and solutions for plant disease management and sustainable agriculture.")}</p>
      </motion.div>
      {articles.length > 0 && <div className="divide-y border-y mt-8">{articles.map(article => <article key={article.id} className="py-6"><h3 className="font-heading text-xl font-semibold break-words">{article.title}</h3><p className="text-muted-foreground mt-3 whitespace-pre-wrap break-words">{article.summary}</p>{safeContentUrl(article.url) && <Button asChild variant="outline" className="mt-4 min-h-11"><a href={safeContentUrl(article.url)} target="_blank" rel="noopener noreferrer">{text("Read Articles")}<ExternalLink /></a></Button>}</article>)}</div>}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-card rounded-2xl p-8 lg:p-10 border border-border shadow-sm text-center"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Newspaper className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-heading font-bold text-xl text-foreground mb-3">{tr("Explore My Articles & Insights")}</h3>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">{tr("Covering topics in plant pathology, pest management, seed quality, and agricultural innovation — written for researchers, students, and practitioners alike.")}</p>
        <a
          href="https://pathosolutions.lovable.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg"
        >{tr("Read Articles")}<ExternalLink className="w-5 h-5" />
        </a>
      </motion.div>
    </div>
  </section>
);
};

export default ArticlesSection;
