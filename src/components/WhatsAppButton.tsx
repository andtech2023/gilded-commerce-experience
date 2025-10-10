import { useState } from "react";
import atbotAvatar from "@/assets/atbot.jpg";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = "376369939";
  const message = "Hola! Me gustaría obtener más información sobre sus servicios.";

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed bottom-24 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleClick}
        className="relative flex items-center justify-center transition-transform duration-300 hover:scale-110 animate-bounce"
        style={{ animationDuration: "3s" }}
        aria-label="Contactar por WhatsApp con ATBOT"
      >
        {/* Avatar ATBOT */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary glow-gold">
          <img
            src={atbotAvatar}
            alt="ATBOT - Asistente Virtual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-xl animate-pulse" />
      </button>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card border border-border rounded-lg px-4 py-2 shadow-xl animate-fade-in">
          <p className="text-sm font-medium text-foreground">
            Chatea con ATBOT
          </p>
          <p className="text-xs text-muted-foreground">
            Asistente virtual de AndorraTech
          </p>
        </div>
      )}
    </div>
  );
};

export default WhatsAppButton;
