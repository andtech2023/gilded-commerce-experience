import { useState } from "react";
import { CreditCard, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import RedsysPaymentModal from "./RedsysPaymentModal";

const TestPaymentButton = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
      <div className="fixed bottom-24 right-4 z-50">
        <Button
          onClick={() => setShowPaymentModal(true)}
          variant="premium"
          size="lg"
          className="shadow-glow animate-pulse"
        >
          <TestTube className="mr-2" size={20} />
          Prueba de Pago (0.10€)
        </Button>
      </div>

      <RedsysPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        service="Producto de Prueba"
        price="0.10€"
      />
    </>
  );
};

export default TestPaymentButton;
