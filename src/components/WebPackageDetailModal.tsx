import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart } from "lucide-react";

interface WebPackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  deliveryTime: string;
}

interface WebPackageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: WebPackage;
  onPurchase: () => void;
}

const WebPackageDetailModal = ({ isOpen, onClose, package: pkg, onPurchase }: WebPackageDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif text-gradient-gold">
            Desarrollo Web – {pkg.name}
          </DialogTitle>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-4xl font-bold text-primary">{pkg.price}</span>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Descripción</h3>
            <p className="text-muted-foreground">{pkg.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Características incluidas</h3>
            <ul className="space-y-3">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tiempo de entrega:</span>
              <span className="font-semibold text-foreground">{pkg.deliveryTime}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cerrar
            </Button>
            <Button
              variant="premium"
              onClick={() => {
                onClose();
                onPurchase();
              }}
              className="flex-1 bg-gradient-to-r from-primary to-primary-variant"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Comprar Ahora
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebPackageDetailModal;
