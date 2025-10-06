import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AIConsultingSection from "@/components/AIConsultingSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TelegramButton from "@/components/TelegramButton";

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
      
      {/* Telegram Button */}
      <TelegramButton />
    </div>
  );
};

export default Index;
