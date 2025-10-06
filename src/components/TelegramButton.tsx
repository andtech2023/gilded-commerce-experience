import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const TelegramButton = () => {
  const telegramUsername = "andorratech"; // Usuario de Telegram de AndorraTech
  const message = "Hola, me gustaría obtener más información sobre sus servicios";
  
  const handleTelegramClick = () => {
    const text = encodeURIComponent(message);
    const telegramUrl = `https://t.me/${telegramUsername}?text=${text}`;
    window.open(telegramUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <Button
        onClick={handleTelegramClick}
        className="rounded-full h-14 w-14 bg-[#0088cc] hover:bg-[#0077b3] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-0"
        size="icon"
        aria-label="Contactar por Telegram"
      >
        <Send className="h-6 w-6 text-white" fill="white" />
      </Button>
      <div className="absolute -top-14 right-0 bg-card border border-border rounded-lg px-3 py-2 text-sm whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
        ¿Necesitas ayuda? Chatea con nosotros
      </div>
    </div>
  );
};

export default TelegramButton;
