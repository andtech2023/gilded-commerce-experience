import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "34651234567"; // Reemplaza con tu número de WhatsApp
  const message = "Hola, me gustaría obtener más información sobre sus servicios";
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        size="icon"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" fill="white" />
      </Button>
      <div className="absolute -top-12 right-0 bg-card border border-border rounded-lg px-3 py-1 text-sm whitespace-nowrap shadow-lg opacity-0 pointer-events-none animate-pulse">
        ¿Necesitas ayuda? Chatea con nosotros
      </div>
    </div>
  );
};

export default WhatsAppButton;