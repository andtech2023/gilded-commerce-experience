import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AIConsultingSection from "@/components/AIConsultingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TelegramButton from "@/components/TelegramButton";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Andorra Tech | Especialistas en IA y Automatización"
        description="Soluciones de IA en Andorra y Barcelona. Automatización empresarial, ahorro energético, desarrollo web y marketing digital. Consultoría tech premium."
        canonical="https://www.andorratech.net/"
      />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AIConsultingSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      
      {/* Telegram Button */}
      <TelegramButton />
      
      {/* WhatsApp Button with ATBOT */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
