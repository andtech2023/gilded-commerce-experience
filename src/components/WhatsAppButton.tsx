import { useState, useEffect } from "react";
import atbotAvatar from "@/assets/atbot.jpg";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const whatsappNumber = "376369939";
  const message = "Hola! Me gustaría obtener más información sobre sus servicios.";

  useEffect(() => {
    // Mostrar bienvenida solo la primera vez
    const welcomed = sessionStorage.getItem('atbot-welcomed');
    if (!welcomed) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
        setHasShownWelcome(true);
        sessionStorage.setItem('atbot-welcomed', 'true');
        
        // Cerrar automáticamente después de 8 segundos
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
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-md w-full mx-4">
            <div className="relative">
              {/* Avatar grande con efecto de voz */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <img
                  src={atbotAvatar}
                  alt="ATBOT - Asistente Virtual"
                  className="w-full h-full object-cover rounded-full border-4 border-primary shadow-elegant"
                />
                {/* Ondas de sonido animadas */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/40 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
              </div>
              
              {/* Texto de bienvenida */}
              <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <h2 className="text-3xl font-serif font-bold text-gradient-gold">
                  ¡Bienvenido a AndorraTech!
                </h2>
                <div className="space-y-2 text-foreground">
                  <p className="text-lg">
                    Soy <span className="font-semibold text-primary">ATBOT</span>, tu asistente virtual
                  </p>
                  <p className="text-muted-foreground">
                    Estoy aquí para responder todas tus dudas e inquietudes sobre inteligencia artificial y nuestros servicios.
                  </p>
                  <p className="text-muted-foreground">
                    Voy a guiarte para que obtengas la mejor información.
                  </p>
                </div>
                
                <Button
                  onClick={() => setShowWelcome(false)}
                  variant="premium"
                  size="lg"
                  className="mt-6"
                >
                  ¡Empecemos!
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante */}
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
    </>
  );
};

export default WhatsAppButton;
