import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MissionVisionSection from "@/components/MissionVisionSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArticlesSection from "@/components/ArticlesSection";
import CommitmentSection from "@/components/CommitmentSection";
import PartnerCTASection from "@/components/PartnerCTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <MissionVisionSection />
    <ExperienceSection />
    <EducationSection />
    <ServicesSection />
    <SkillsSection />
    <ProjectsSection />
    <ArticlesSection />
    <CommitmentSection />
    <PartnerCTASection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
