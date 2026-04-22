import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const tr = (es: string, ca: string) => (language === "ca" ? ca : es);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-serif font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
          {tr("¡Pago Exitoso!", "Pagament Exitós!")}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {tr(
            "Tu pago ha sido procesado correctamente. Recibirás un correo de confirmación en breve.",
            "El teu pagament s'ha processat correctament. Rebràs un correu de confirmació en breu."
          )}
        </p>
        <Button 
          variant="premium" 
          size="lg"
          onClick={() => navigate("/")}
        >
          {tr("Volver al Inicio", "Tornar a l'Inici")}
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
