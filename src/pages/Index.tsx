import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import ImpactSection from "@/components/ImpactSection";
import AboutSection from "@/components/AboutSection";
import MissionVisionSection from "@/components/MissionVisionSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import PublicationsSection from "@/components/PublicationsSection";
import TrainingsPreviewSection from "@/components/TrainingsPreviewSection";
import MembershipsSection from "@/components/MembershipsSection";
import ServicesSection from "@/components/ServicesSection";
import FAQSection from "@/components/FAQSection";
import SkillsSection from "@/components/SkillsSection";
import ArticlesSection from "@/components/ArticlesSection";
import CommitmentSection from "@/components/CommitmentSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnerCTASection from "@/components/PartnerCTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="Mohamed Mohamud SH Hassan | AgroPath — Plant Pathology Specialist"
      description="Plant Pathology Specialist, Seed Inspector, and Founder of PathoSolutions. Advancing sustainable agriculture and food security in Somalia."
      path="/"
      ogType="profile"
    />
    <Navbar />
    <HeroSection />
    <WelcomeSection />
    <ImpactSection />
    <AboutSection />
    <MissionVisionSection />
    <ExperienceSection />
    <EducationSection />
    <PublicationsSection />
    <TrainingsPreviewSection />
    <MembershipsSection />
    <ServicesSection />
    <FAQSection />
    <SkillsSection />
    <ArticlesSection />
    <CommitmentSection />
    <TestimonialsSection />
    <PartnerCTASection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
