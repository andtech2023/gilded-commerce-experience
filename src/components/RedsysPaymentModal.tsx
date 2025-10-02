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
import CryptoJS from "crypto-js";

interface RedsysPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
  price: string;
}

const RedsysPaymentModal = ({ isOpen, onClose, service, price }: RedsysPaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  });

  // Configuración Redsys/Morabanc - MODO PRUEBAS
  const redsysConfig = {
    merchantCode: "999008881", // Código de comercio de pruebas de Redsys
    terminal: "001",
    currency: "978", // EUR
    transactionType: "0", // Autorización
    merchantName: "AT- ANDORRATECH",
    secretKey: "sq7HjrUOBfKmC576ILgskD5srU870gJ7", // Clave de pruebas de Redsys
    urlOK: `${window.location.origin}/payment-success`,
    urlKO: `${window.location.origin}/payment-cancelled`,
    url: "https://sis-t.redsys.es:25443/sis/realizarPago", // URL de PRUEBAS
    // Para PRODUCCIÓN cambiar a: https://sis.redsys.es/sis/realizarPago
    // Y usar tus credenciales reales: merchantCode: "992228353", secretKey: "hJipFuXQ9bfysGkOLSLv2NqKqbEC7tTq"
  };

  const generateMerchantParameters = () => {
    const amount = price.replace(/[^\d]/g, "").padStart(3, "0");
    const order = Date.now().toString().slice(-12);
    
    const merchantParameters = {
      DS_MERCHANT_AMOUNT: amount,
      DS_MERCHANT_ORDER: order,
      DS_MERCHANT_MERCHANTCODE: redsysConfig.merchantCode,
      DS_MERCHANT_CURRENCY: redsysConfig.currency,
      DS_MERCHANT_TRANSACTIONTYPE: redsysConfig.transactionType,
      DS_MERCHANT_TERMINAL: redsysConfig.terminal,
      DS_MERCHANT_MERCHANTURL: `${window.location.origin}/api/redsys-notification`,
      DS_MERCHANT_URLOK: redsysConfig.urlOK,
      DS_MERCHANT_URLKO: redsysConfig.urlKO,
      DS_MERCHANT_MERCHANTNAME: redsysConfig.merchantName,
      DS_MERCHANT_PRODUCTDESCRIPTION: service,
      DS_MERCHANT_TITULAR: formData.name,
      DS_MERCHANT_MERCHANTDATA: JSON.stringify({ email: formData.email, service }),
    };

    return btoa(JSON.stringify(merchantParameters));
  };

  const generateSignature = (merchantParameters: string) => {
    const key = CryptoJS.enc.Base64.parse(redsysConfig.secretKey);
    const iv = CryptoJS.enc.Hex.parse("0000000000000000");
    
    const cipher = CryptoJS.TripleDES.encrypt(
      merchantParameters,
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      }
    );
    
    return CryptoJS.HmacSHA256(merchantParameters, cipher.toString()).toString(CryptoJS.enc.Base64);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const merchantParameters = generateMerchantParameters();
      const signature = generateSignature(merchantParameters);

      // Crear formulario para enviar a Redsys
      const form = document.createElement("form");
      form.method = "POST";
      form.action = redsysConfig.url;
      form.target = "_blank";

      const paramsInput = document.createElement("input");
      paramsInput.type = "hidden";
      paramsInput.name = "Ds_MerchantParameters";
      paramsInput.value = merchantParameters;
      form.appendChild(paramsInput);

      const signatureInput = document.createElement("input");
      signatureInput.type = "hidden";
      signatureInput.name = "Ds_Signature";
      signatureInput.value = signature;
      form.appendChild(signatureInput);

      const versionInput = document.createElement("input");
      versionInput.type = "hidden";
      versionInput.name = "Ds_SignatureVersion";
      versionInput.value = "HMAC_SHA256_V1";
      form.appendChild(versionInput);

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      toast.info("Redirigiendo a la pasarela de pago segura...");
      
      setTimeout(() => {
        setIsProcessing(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al procesar el pago. Por favor, inténtelo de nuevo.");
      setIsProcessing(false);
    }
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
            Pago Seguro - Morabanc
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Procesamiento seguro con Redsys/Morabanc
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
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Juan Pérez García"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-background border-border"
            />
          </div>

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
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+376 123 456"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="flex items-center justify-center space-x-2 text-muted-foreground text-sm">
            <Shield size={16} />
            <span>Pago seguro con Morabanc - Certificado PCI DSS</span>
          </div>

          <div className="flex items-center justify-center space-x-4 opacity-60">
            <img src="/visa.svg" alt="Visa" className="h-8" />
            <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
            <CreditCard className="h-8 w-8" />
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
              {isProcessing ? "Procesando..." : "Pagar con Tarjeta"}
            </Button>
          </div>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-4">
          Al continuar, serás redirigido a la pasarela segura de Morabanc para completar el pago.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default RedsysPaymentModal;