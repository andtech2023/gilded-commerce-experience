import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AIConsultingSection from "@/components/AIConsultingSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const Index = () => {
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    service: "",
    price: "",
  });

  // Example payment button - you can integrate this wherever needed
  const handlePaymentExample = () => {
    setPaymentModal({
      isOpen: true,
      service: "Desarrollo Web Premium",
      price: "€2,999",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AIConsultingSection />
      <AboutSection />
      
      {/* Demo Payment Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-serif mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Pasarela de Pago Integrada
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Procesamiento seguro de pagos con encriptación de nivel bancario. 
            Aceptamos todas las principales tarjetas de crédito y débito.
          </p>
          <Button 
            variant="premium" 
            size="lg"
            onClick={handlePaymentExample}
            className="group"
          >
            <CreditCard className="mr-2" />
            Probar Pago Seguro
          </Button>
        </div>
      </section>

      <ContactSection />
      <Footer />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ ...paymentModal, isOpen: false })}
        service={paymentModal.service}
        price={paymentModal.price}
      />
    </div>
  );
};

export default Index;
