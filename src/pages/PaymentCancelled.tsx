import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-serif font-bold mb-4 text-foreground">
          Pago Cancelado
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          El pago ha sido cancelado. Si fue un error, puedes intentarlo de nuevo.
        </p>
        <Button 
          variant="premium" 
          size="lg"
          onClick={() => navigate("/")}
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
};

export default PaymentCancelled;
