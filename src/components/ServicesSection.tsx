import { Code, Cloud, Shield, Smartphone, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ServiceDetailModal from "./ServiceDetailModal";
import RedsysPaymentModal from "./RedsysPaymentModal";
import aiServicesBg from "@/assets/ai-services-bg.jpg";
import WebDevelopmentSlider from "./WebDevelopmentSlider";

const services = [
  {
    icon: Code,
    title: "Desarrollo Web - Básico",
    description: "Web corporativa profesional con diseño responsive, SEO básico y formulario de contacto",
    price: "€950",
    features: ["Hasta 5 páginas", "Diseño responsive", "SEO básico", "Formulario de contacto", "Hosting 1 año incluido"],
  },
  {
    icon: Code,
    title: "Desarrollo Web - Profesional",
    description: "Web avanzada con pasarela de pago integrada, gestión de contenidos y analytics",
    price: "€1,450",
    features: ["Hasta 10 páginas", "Pasarela de pago integrada", "Panel de administración", "SEO avanzado", "Analytics y métricas", "Hosting 1 año incluido"],
  },
  {
    icon: Code,
    title: "Desarrollo Web - Premium",
    description: "Solución completa con todas las funcionalidades, personalización total y soporte prioritario",
    price: "€2,999",
    features: ["Páginas ilimitadas", "E-commerce completo", "Integraciones API", "IA integrada", "Multiidioma", "Soporte prioritario 24/7", "Hosting premium incluido"],
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description: "Experiencias móviles nativas para iOS y Android",
    price: "Desde €4,999",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Infraestructura cloud segura y optimizada para su negocio",
    price: "Desde €1,499/mes",
  },
  {
    icon: Shield,
    title: "Ciberseguridad",
    description: "Protección avanzada para sus activos digitales",
    price: "Desde €999/mes",
  },
  {
    icon: Globe,
    title: "Marketing Digital",
    description: "Estrategias digitales para maximizar su presencia online",
    price: "Desde €1,999/mes",
  },
  {
    icon: Cpu,
    title: "IA & Machine Learning",
    description: "Soluciones inteligentes que transforman sus datos en valor",
    price: "Consultar",
  },
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    service: "",
    price: "",
  });

  const handleServiceDetail = (service: any) => {
    setSelectedService(service);
  };

  const handlePayment = () => {
    if (selectedService) {
      setPaymentModal({
        isOpen: true,
        service: selectedService.title,
        price: selectedService.price,
      });
      setSelectedService(null);
    }
  };

  return (
    <section id="servicios" className="py-20 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={aiServicesBg} 
          alt="AI Technology Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="bg-gradient-gold bg-clip-text text-transparent">Servicios</span> Premium
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluciones tecnológicas diseñadas para impulsar su éxito empresarial
          </p>
        </div>
        {/* Web Development Pricing Slider */}
        <div className="mb-16">
          <WebDevelopmentSlider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services
            .filter((service) => !service.title.startsWith("Desarrollo Web -"))
            .map((service, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="text-primary-foreground" size={28} />
                </div>
                
                <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                
                {service.features && (
                  <ul className="mb-4 space-y-2">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-lg">{service.price}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleServiceDetail(service)}
                  >
                    Más Info
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="premium" size="xl">
            Ver Todos los Servicios
          </Button>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
          onSelectPayment={handlePayment}
        />
      )}

      {/* Payment Modal */}
      {paymentModal.isOpen && (
        <RedsysPaymentModal
          isOpen={paymentModal.isOpen}
          onClose={() => setPaymentModal({ isOpen: false, service: "", price: "" })}
          service={paymentModal.service}
          price={paymentModal.price}
        />
      )}
    </section>
  );
};

export default ServicesSection;