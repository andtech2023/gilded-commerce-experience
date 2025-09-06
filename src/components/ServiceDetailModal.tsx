import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    price: string;
    details?: {
      features: string[];
      technologies: string[];
      timeline: string;
      demoImage?: string;
      portfolio?: { title: string; description: string; image: string }[];
    };
  };
  onSelectPayment: () => void;
}

const ServiceDetailModal = ({ isOpen, onClose, service, onSelectPayment }: ServiceDetailModalProps) => {
  const [selectedDemo, setSelectedDemo] = useState(0);
  
  const defaultDetails = {
    features: [
      "Análisis completo de requisitos",
      "Diseño personalizado y único",
      "Desarrollo con tecnologías de vanguardia",
      "Testing y control de calidad",
      "Soporte post-lanzamiento incluido",
      "Formación para su equipo"
    ],
    technologies: ["React", "Node.js", "TypeScript", "Cloud AWS/Azure", "Docker", "CI/CD"],
    timeline: "4-8 semanas",
    portfolio: [
      { 
        title: "E-commerce Premium", 
        description: "Plataforma de comercio electrónico con IA integrada",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop"
      },
      { 
        title: "App Financiera", 
        description: "Aplicación de gestión financiera con blockchain",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
      },
      { 
        title: "Portal Corporativo", 
        description: "Sistema integral de gestión empresarial",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
      }
    ]
  };

  const details = service.details || defaultDetails;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif bg-gradient-gold bg-clip-text text-transparent">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-lg mt-2">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Features Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Características Incluidas</h3>
            <ul className="space-y-3">
              {details.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={20} />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Detalles Técnicos</h3>
            <Card className="bg-card/50">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Tecnologías</p>
                  <div className="flex flex-wrap gap-2">
                    {details.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tiempo de Entrega</p>
                  <p className="text-foreground font-semibold">{details.timeline}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Portfolio/Demos Section */}
        {details.portfolio && details.portfolio.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Trabajos Realizados</h3>
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <img 
                  src={details.portfolio[selectedDemo].image} 
                  alt={details.portfolio[selectedDemo].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {details.portfolio[selectedDemo].title}
                  </h4>
                  <p className="text-white/80">
                    {details.portfolio[selectedDemo].description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {details.portfolio.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDemo(index)}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      selectedDemo === index ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Price and Action */}
        <div className="mt-8 p-6 bg-gradient-subtle rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Inversión desde</p>
              <p className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                {service.price}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Volver
              </Button>
              <Button variant="premium" onClick={onSelectPayment} className="group">
                Contratar Ahora
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;