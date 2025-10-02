import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AIConsultingSection from "@/components/AIConsultingSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TestPaymentButton from "@/components/TestPaymentButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AIConsultingSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
      
      {/* Test Payment Button - Remove after testing */}
      <TestPaymentButton />
    </div>
  );
};

export default Index;
