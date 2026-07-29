import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrainingsSection from "@/components/TrainingsSection";
import { motion } from "framer-motion";

const Trainings = () => (
  <div className="min-h-screen bg-background">
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
