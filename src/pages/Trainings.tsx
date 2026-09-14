import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrainingsSection from "@/components/TrainingsSection";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { Helmet } from "react-helmet-async";

const completedCourses = [
  {
    name: "Conducting a Phytosanitary Capacity Evaluation (PCE)",
    provider: "FAO eLearning Academy / IPPC",
  },
  {
    name: "United Nations Sustainable Development Cooperation Framework",
    provider: "UN System Staff College",
  },
  {
    name: "Climate Change, Peace and Security: Understanding Climate-Related Security Risks Through an Integrated Lens",
    provider: "UNITAR / UN CC:Learn",
  },
  {
    name: "Foundational Primer on the 2030 Agenda for Sustainable Development (SDG Primer)",
    provider: "UN System Staff College",
  },
  {
    name: "Synergizing Disaster Risk Reduction and Climate Change Adaptation – Thought Leadership Course",
    provider: "UN System Staff College (UNSSC) & UNDRR",
  },
];

const coursesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Completed courses and certifications",
  itemListElement: completedCourses.map((course, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: course.name,
      provider: { "@type": "Organization", name: course.provider },
      url: "https://agropath.lovable.app/trainings",
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "P8H",
      },
    },
  })),
};

const Trainings = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(coursesSchema)}</script>
    </Helmet>
    <Seo
      title="Trainings & Professional Development | AgroPath"
      description="Trainings facilitated and attended, plus certified courses completed with the UN, UNITAR, FAO and other leading institutions in seed science and plant health."
      path="/trainings"
    />
    <Navbar />
    <main className="pt-24">
      <section className="py-14 lg:py-20 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Continuous Learning
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
              Trainings & Professional Development
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A record of certifications, courses, and professional development activities
              undertaken with UN agencies, FAO, and other leading institutions.
            </p>
          </motion.div>
        </div>
      </section>
      <TrainingsSection />
    </main>
    <Footer />
  </div>
);

export default Trainings;
