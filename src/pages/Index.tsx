import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import AboutSection from "@/components/AboutSection";
import MissionVisionSection from "@/components/MissionVisionSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import MembershipsSection from "@/components/MembershipsSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArticlesSection from "@/components/ArticlesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CommitmentSection from "@/components/CommitmentSection";
import PartnerCTASection from "@/components/PartnerCTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <WelcomeSection />
    <AboutSection />
    <MissionVisionSection />
    <ExperienceSection />
    <EducationSection />
    <MembershipsSection />
    <ServicesSection />
    <SkillsSection />
    <ProjectsSection />
    <ArticlesSection />
    <TestimonialsSection />
    <CommitmentSection />
    <PartnerCTASection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
