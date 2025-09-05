import { useState } from "react";
import { X, CreditCard, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
  price: string;
}

const PaymentModal = ({ isOpen, onClose, service, price }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast.success("¡Pago procesado con éxito!", {
        description: "Recibirá un correo de confirmación en breve.",
      });
      setIsProcessing(false);
      onClose();
      setFormData({
        email: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        name: "",
      });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-gradient-gold">
            Pago Seguro
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Procesamiento seguro con encriptación de 256 bits
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gradient-subtle p-4 rounded-xl mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Servicio:</span>
            <span className="font-semibold">{service}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-muted-foreground">Total:</span>
            <span className="text-2xl font-bold text-primary">{price}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="su@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-background border-border"
            />
          </div>

          <div>
            <Label htmlFor="name">Nombre en la Tarjeta</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Juan Pérez"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-background border-border"
            />
          </div>

          <div>
            <Label htmlFor="cardNumber">Número de Tarjeta</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                name="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                className="bg-background border-border pl-10"
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Fecha de Expiración</Label>
              <Input
                id="expiry"
                name="expiry"
                type="text"
                placeholder="MM/AA"
                value={formData.expiry}
                onChange={handleInputChange}
                required
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Input
                  id="cvv"
                  name="cvv"
                  type="text"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  className="bg-background border-border pl-10"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-muted-foreground text-sm">
            <Shield size={16} />
            <span>Pago seguro con encriptación SSL</span>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="premium"
              className="flex-1"
              disabled={isProcessing}
            >
              {isProcessing ? "Procesando..." : "Confirmar Pago"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;