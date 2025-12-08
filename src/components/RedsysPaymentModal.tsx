import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Lock, Shield, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RedsysPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
  price: string;
}

const RedsysPaymentModal = ({ isOpen, onClose, service, price }: RedsysPaymentModalProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim() || formData.name.length < 2) {
      toast({
        title: "Error",
        description: "Por favor, introduce un nombre válido",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Por favor, introduce un email válido",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Call Edge Function to generate secure signature
      const { data, error } = await supabase.functions.invoke('redsys-signature', {
        body: {
          service,
          price,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }
      });

      if (error) {
        throw new Error(error.message || 'Error al procesar el pago');
      }

      if (!data || !data.Ds_MerchantParameters || !data.Ds_Signature) {
        throw new Error('Respuesta inválida del servidor');
      }

      // Create and submit form to Redsys
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.redsysUrl;

      const addField = (name: string, value: string) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      addField("Ds_SignatureVersion", data.Ds_SignatureVersion);
      addField("Ds_MerchantParameters", data.Ds_MerchantParameters);
      addField("Ds_Signature", data.Ds_Signature);

      document.body.appendChild(form);
      
      toast({
        title: "Redirigiendo a la pasarela de pago segura...",
        description: "Serás redirigido a Redsys para completar el pago.",
      });

      form.submit();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al procesar el pago. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-primary/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-orbitron text-primary">
            <CreditCard className="h-5 w-5" />
            Pago Seguro
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Procesado por Redsys/Morabanc - Totalmente seguro y encriptado
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-primary/20">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Servicio:</span>
              <span className="text-primary font-semibold">{service}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-300">Precio:</span>
              <span className="text-2xl font-bold text-primary">{price}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-gray-300">Nombre completo *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Tu nombre completo"
                required
                disabled={isProcessing}
                maxLength={100}
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-gray-300">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="tu@email.com"
                required
                disabled={isProcessing}
                maxLength={255}
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-gray-300">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="+376 XXX XXX"
                disabled={isProcessing}
                maxLength={20}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-800/30 p-3 rounded-lg">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Pago procesado de forma segura por Redsys/Morabanc</span>
          </div>

          <div className="flex items-center justify-center gap-2 py-2">
            <Lock className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-400">Conexión SSL segura</span>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pagar con Tarjeta
                </>
              )}
            </Button>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            <img src="https://www.redsys.es/images/logotipos/visa.png" alt="Visa" className="h-6" />
            <img src="https://www.redsys.es/images/logotipos/mastercard.png" alt="Mastercard" className="h-6" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RedsysPaymentModal;