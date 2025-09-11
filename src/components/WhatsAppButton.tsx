import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "34600000000"; // IMPORTANTE: Actualiza con tu número real de WhatsApp (código país + número)
  const message = "Hola, me gustaría obtener más información sobre sus servicios";
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <Button
          onClick={handleWhatsAppClick}
          className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-0"
          size="icon"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="h-6 w-6 text-white" fill="white" />
        </Button>
        <div className="absolute -top-14 right-0 bg-card border border-border rounded-lg px-3 py-2 text-sm whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
          ¿Necesitas ayuda? Chatea con nosotros
        </div>
      </div>
      
      {/* Mobile WhatsApp Link (alternative for mobile) */}
      <a
        href={`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`}
        className="fixed bottom-6 left-6 z-50 md:hidden"
        aria-label="WhatsApp"
      >
        <div className="bg-green-500 rounded-full p-3 shadow-lg">
          <MessageCircle className="h-6 w-6 text-white" fill="white" />
        </div>
      </a>
    </>
  );
};

export default WhatsAppButton;