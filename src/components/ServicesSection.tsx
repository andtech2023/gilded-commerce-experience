import { Code, Cloud, Shield, Smartphone, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ServiceDetailModal from "./ServiceDetailModal";
import PaymentModal from "./PaymentModal";

const services = [
  {
    icon: Code,
    title: "Desarrollo Web",
    description: "Aplicaciones web modernas y escalables con las últimas tecnologías",
    price: "Desde €2,999",
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
    <section id="servicios" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="bg-gradient-gold bg-clip-text text-transparent">Servicios</span> Premium
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluciones tecnológicas diseñadas para impulsar su éxito empresarial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
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
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ ...paymentModal, isOpen: false })}
        service={paymentModal.service}
        price={paymentModal.price}
      />
    </section>
  );
};

export default ServicesSection;