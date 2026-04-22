import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const PaymentCancelled = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const tr = (es: string, ca: string) => (language === "ca" ? ca : es);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-serif font-bold mb-4 text-foreground">
          {tr("Pago Cancelado", "Pagament Cancel·lat")}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {tr(
            "El pago ha sido cancelado. Si fue un error, puedes intentarlo de nuevo.",
            "El pagament s'ha cancel·lat. Si va ser un error, pots tornar-ho a provar."
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

export default PaymentCancelled;
