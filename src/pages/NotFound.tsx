import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <section className="py-14 lg:py-20 bg-secondary/30 min-h-[60vh] flex items-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-10 sm:p-14 lg:p-16"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
              </div>

              <h1 className="font-heading text-7xl sm:text-8xl lg:text-9xl font-bold text-primary mb-4">
                404
              </h1>
              <p className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                Page not found
              </p>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                This page doesn’t exist — but there’s plenty to explore.
                Return to the homepage to learn more about AgroPath and sustainable agriculture.
              </p>

              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
