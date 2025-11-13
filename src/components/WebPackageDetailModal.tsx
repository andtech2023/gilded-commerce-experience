import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, Zap } from "lucide-react";

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

          <div className={`${pkg.deliveryTime === "48h" ? "relative bg-gradient-to-r from-primary/30 via-primary-variant/30 to-primary/30 border-4 border-primary shadow-glow" : "bg-card border border-border"} rounded-xl p-6`}>
            {pkg.deliveryTime === "48h" && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer rounded-xl"></div>
            )}
            <div className="relative flex flex-col items-center gap-4">
              <span className="text-muted-foreground font-bold text-lg uppercase tracking-wide">⚡ Tiempo de entrega ⚡</span>
              {pkg.deliveryTime === "48h" ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-primary blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative flex items-center gap-3 bg-gradient-to-r from-primary via-primary-glow to-primary text-white px-8 py-4 rounded-xl font-black text-3xl shadow-glow border-2 border-primary-glow transform hover:scale-105 transition-transform">
                    <Zap className="w-8 h-8 animate-bounce" fill="currentColor" />
                    <span className="drop-shadow-lg">¡SOLO {pkg.deliveryTime.toUpperCase()}!</span>
                    <Zap className="w-8 h-8 animate-bounce" fill="currentColor" />
                  </div>
                </div>
              ) : (
                <span className="font-semibold text-foreground text-xl">{pkg.deliveryTime}</span>
              )}
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
