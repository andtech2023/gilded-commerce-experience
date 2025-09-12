import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "376369939"; // Número de WhatsApp de AndorraTech
  const message = "Hola, me gustaría obtener más información sobre sus servicios";
  
  const openLink = (url: string) => {
    // Use noopener/noreferrer for safety and to avoid popup blockers
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppClick = () => {
    const number = (phoneNumber || "").replace(/\D/g, ""); // Solo dígitos, sin + ni espacios
    const text = encodeURIComponent(message);
    const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

    // Deep link (app) + fallbacks
    const deepLink = `whatsapp://send?phone=${number}&text=${text}`;
    const waMeUrl = `https://wa.me/${number}?text=${text}`; // Recomendado por WhatsApp
    const webUrl = `https://web.whatsapp.com/send?phone=${number}&text=${text}`; // Desktop fallback

    if (isMobile) {
      // Intenta abrir la app, si no funciona abre wa.me
      window.location.href = deepLink;
      setTimeout(() => openLink(waMeUrl), 500);
    } else {
      // En escritorio es más fiable abrir Web WhatsApp
      openLink(webUrl);
    }
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
        href={`whatsapp://send?phone=${phoneNumber.replace(/\D/g, "")}&text=${encodeURIComponent(message)}`}
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