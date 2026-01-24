import { useState, useEffect } from "react";
import logo3D from "@/assets/logo-3d-andorratech.png";

interface LanguageGateProps {
  children: React.ReactNode;
  onLanguageSelect: (lang: "es" | "ca") => void;
}

const LanguageGate = ({ children, onLanguageSelect }: LanguageGateProps) => {
  const [isVerified, setIsVerified] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"es" | "ca" | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Check if user already verified in this session
  useEffect(() => {
    const verified = sessionStorage.getItem("humanVerified");
    const savedLang = sessionStorage.getItem("preferredLanguage") as "es" | "ca" | null;
    if (verified === "true" && savedLang) {
      setIsVerified(true);
      onLanguageSelect(savedLang);
    }
  }, [onLanguageSelect]);

  const handleLanguageClick = (lang: "es" | "ca") => {
    setSelectedLang(lang);
    setShowVerification(true);
  };

  const handleVerification = () => {
    if (selectedLang) {
      sessionStorage.setItem("humanVerified", "true");
      sessionStorage.setItem("preferredLanguage", selectedLang);
      setIsExiting(true);
      
      setTimeout(() => {
        setIsVerified(true);
        onLanguageSelect(selectedLang);
      }, 600);
    }
  };

  const handleCloseVerification = () => {
    setShowVerification(false);
    setSelectedLang(null);
  };

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Logo */}
      <div className="relative mb-16">
        {/* Glow effect */}
        <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full animate-pulse-glow" />
        
        {/* Logo with floating animation - transparent background with mix-blend */}
        <img
          src={logo3D}
          alt="AndorraTech Logo"
          className="w-64 h-64 md:w-80 md:h-80 object-contain relative z-10 animate-float-world drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] mix-blend-lighten"
        />
      </div>

      {/* Language Selection */}
      <div className="flex flex-col items-center gap-10 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-xl md:text-2xl font-serif text-foreground/80">
          Selecciona tu idioma
        </h2>
        
        <div className="flex gap-16 md:gap-24">
          {/* Spanish Flag */}
          <button
            onClick={() => handleLanguageClick("es")}
            className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-110"
          >
            <div className="w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden shadow-lg border-2 border-transparent group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              {/* Spanish Flag */}
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 bg-[#c60b1e]" />
                <div className="flex-[2] bg-[#ffc400]" />
                <div className="flex-1 bg-[#c60b1e]" />
              </div>
            </div>
            <span className="text-foreground/70 group-hover:text-primary font-semibold text-lg transition-colors">
              Español
            </span>
          </button>

          {/* Andorran Flag */}
          <button
            onClick={() => handleLanguageClick("ca")}
            className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-110"
          >
            <div className="w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden shadow-lg border-2 border-transparent group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              {/* Andorran Flag */}
              <div className="w-full h-full flex">
                <div className="flex-1 bg-[#0032A0]" />
                <div className="flex-1 bg-[#FEDF00] flex items-center justify-center">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-[#C8102E]" />
                </div>
                <div className="flex-1 bg-[#C8102E]" />
              </div>
            </div>
            <span className="text-foreground/70 group-hover:text-primary font-semibold text-lg transition-colors">
              Català
            </span>
          </button>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerification && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
          onClick={handleCloseVerification}
        >
          <div 
            className="bg-card border border-border rounded-2xl p-8 max-w-sm mx-4 animate-scale-in shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                  />
                </svg>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                  {selectedLang === "es" ? "Verificación de seguridad" : "Verificació de seguretat"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {selectedLang === "es" 
                    ? "Por favor, confirma que no eres un robot" 
                    : "Si us plau, confirma que no ets un robot"}
                </p>
              </div>

              <button
                onClick={handleVerification}
                className="w-full py-4 px-6 bg-card border-2 border-border rounded-xl flex items-center gap-4 hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="w-6 h-6 border-2 border-muted-foreground rounded group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all duration-300">
                  <svg 
                    className="w-4 h-4 text-transparent group-hover:text-primary-foreground transition-colors" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <span className="text-foreground font-medium">
                  {selectedLang === "es" ? "No soy un robot" : "No sóc un robot"}
                </span>
              </button>

              <button
                onClick={handleCloseVerification}
                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                {selectedLang === "es" ? "Cancelar" : "Cancel·lar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer text */}
      <p className="absolute bottom-8 text-muted-foreground/50 text-sm animate-fade-in" style={{ animationDelay: "1s" }}>
        © {new Date().getFullYear()} AndorraTech • Connecting Innovation
      </p>

      {/* CSS Animations */}
      <style>{`
        @keyframes float-world {
          0%, 100% {
            transform: translateY(0) rotateY(0deg) scale(1);
          }
          25% {
            transform: translateY(-15px) rotateY(5deg) scale(1.02);
          }
          50% {
            transform: translateY(-25px) rotateY(0deg) scale(1.03);
          }
          75% {
            transform: translateY(-15px) rotateY(-5deg) scale(1.02);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        
        .animate-float-world {
          animation: float-world 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LanguageGate;
