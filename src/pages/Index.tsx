import { useState } from "react";
import Navbar from "@/components/Navbar";
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
  return (
    <div className="min-h-screen bg-background">
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
