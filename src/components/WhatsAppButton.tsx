import { useState, useEffect } from "react";
import atbotAvatar from "@/assets/atbot.jpg";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppButton = () => {
  const { language } = useLanguage();
  const tr = (es: string, ca: string) => (language === "ca" ? ca : es);
  const [isHovered, setIsHovered] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const whatsappNumber = "376369939";
  const message = tr(
    "Hola! Me gustaría obtener más información sobre sus servicios.",
    "Hola! M'agradaria obtenir més informació sobre els vostres serveis."
  );

  useEffect(() => {
    const welcomed = sessionStorage.getItem('atbot-welcomed');
    if (!welcomed) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
        setHasShownWelcome(true);
        sessionStorage.setItem('atbot-welcomed', 'true');
        setTimeout(() => {
          setShowWelcome(false);
        }, 8000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-md w-full mx-4">
            <div className="relative">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <img
                  src={atbotAvatar}
                  alt={tr("ATBOT - Asistente Virtual", "ATBOT - Assistent Virtual")}
                  className="w-full h-full object-cover rounded-full border-4 border-primary shadow-elegant"
                />
                <div className="absolute inset-0 rounded-full border-4 border-primary/40 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
              </div>
              
              <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <h2 className="text-3xl font-serif font-bold text-gradient-gold">
                  {tr("¡Bienvenido a AndorraTech!", "Benvingut a AndorraTech!")}
                </h2>
                <div className="space-y-2 text-foreground">
                  <p className="text-lg">
                    {tr("Soy", "Sóc")} <span className="font-semibold text-primary">ATBOT</span>, {tr("tu asistente virtual", "el teu assistent virtual")}
                  </p>
                  <p className="text-muted-foreground">
                    {tr(
                      "Estoy aquí para responder todas tus dudas e inquietudes sobre inteligencia artificial y nuestros servicios.",
                      "Sóc aquí per respondre tots els teus dubtes i inquietuds sobre intel·ligència artificial i els nostres serveis."
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    {tr("Voy a guiarte para que obtengas la mejor información.", "Et guiaré perquè obtinguis la millor informació.")}
                  </p>
                </div>
                
                <Button
                  onClick={() => setShowWelcome(false)}
                  variant="premium"
                  size="lg"
                  className="mt-6"
                >
                  {tr("¡Empecemos!", "Comencem!")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="fixed bottom-24 right-6 z-50 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={handleClick}
          className="relative flex items-center justify-center transition-transform duration-300 hover:scale-110 animate-bounce"
          style={{ animationDuration: "3s" }}
          aria-label={tr("Contactar por WhatsApp con ATBOT", "Contactar per WhatsApp amb ATBOT")}
        >
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary glow-gold">
            <img
              src={atbotAvatar}
              alt={tr("ATBOT - Asistente Virtual", "ATBOT - Assistent Virtual")}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-xl animate-pulse" />
        </button>

        {isHovered && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card border border-border rounded-lg px-4 py-2 shadow-xl animate-fade-in">
            <p className="text-sm font-medium text-foreground">
              {tr("Chatea con ATBOT", "Xateja amb ATBOT")}
            </p>
            <p className="text-xs text-muted-foreground">
              {tr("Asistente virtual de AndorraTech", "Assistent virtual d'AndorraTech")}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default WhatsAppButton;
