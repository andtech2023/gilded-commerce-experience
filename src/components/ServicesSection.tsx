import { Code, Cloud, Shield, Smartphone, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ServiceDetailModal from "./ServiceDetailModal";
import aiServicesBg from "@/assets/ai-services-bg.jpg";
import mobileAppsBg from "@/assets/mobile-apps-bg.jpg";
import chatbotBg from "@/assets/chatbot-bg.jpg";
import marketingBg from "@/assets/marketing-bg.jpg";
import aiMlBg from "@/assets/ai-ml-bg.jpg";
import WebDevelopmentSlider from "./WebDevelopmentSlider";

const services = [
  {
    icon: Code,
    title: "Desarrollo Web - Básico",
    description: "Web corporativa profesional con diseño responsive, SEO básico y formulario de contacto",
    features: ["Hasta 5 páginas", "Diseño responsive", "SEO básico", "Formulario de contacto", "Hosting 1 año incluido"],
  },
  {
    icon: Code,
    title: "Desarrollo Web - Profesional",
    description: "Web avanzada con pasarela de pago integrada, gestión de contenidos y analytics",
    features: ["Hasta 10 páginas", "Pasarela de pago integrada", "Panel de administración", "SEO avanzado", "Analytics y métricas", "Hosting 1 año incluido"],
  },
  {
    icon: Code,
    title: "Desarrollo Web - Premium",
    description: "Solución completa con todas las funcionalidades, personalización total y soporte prioritario",
    features: ["Páginas ilimitadas", "E-commerce completo", "Integraciones API", "IA integrada", "Multiidioma", "Soporte prioritario 24/7", "Hosting premium incluido"],
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description: "Experiencias móviles nativas para iOS y Android",
    features: ["iOS & Android", "React Native", "Diseño UX/UI", "Integración APIs", "Automatizaciones personalizables"],
    bgImage: mobileAppsBg,
  },
  {
    icon: Cloud,
    title: "ChatBot IA con Voz Humana",
    description: "Asistente virtual inteligente con tecnología de voz natural para atención 24/7",
    features: ["Voz natural y humana", "Respuestas en tiempo real", "Integración WhatsApp", "Disponibilidad 24/7", "Automatizaciones personalizables"],
    bgImage: chatbotBg,
  },
  {
    icon: Globe,
    title: "Marketing Digital",
    description: "Estrategias digitales para maximizar su presencia online",
    features: ["SEO/SEM", "Redes sociales", "Email marketing", "Analytics", "Automatizaciones personalizables"],
    bgImage: marketingBg,
  },
  {
    icon: Cpu,
    title: "IA & Machine Learning",
    description: "Soluciones inteligentes que transforman sus datos en valor",
    features: ["Chatbots IA", "Análisis predictivo", "Automatización", "Visión artificial", "Automatizaciones personalizables"],
    bgImage: aiMlBg,
  },
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleServiceDetail = (service: any) => {
    setSelectedService(service);
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Servicios</span> <span className="text-futuristic-gold">Premium</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluciones tecnológicas diseñadas para impulsar su éxito empresarial
          </p>
        </div>
        {/* Web Development Pricing Slider */}
        <div className="mb-16">
          <WebDevelopmentSlider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services
            .filter((service) => !service.title.startsWith("Desarrollo Web -"))
            .map((service, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:transform hover:-translate-y-2"
            >
              {/* Background Image with Overlay */}
              {service.bgImage && (
                <>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.bgImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/98 via-background/95 to-background/98 group-hover:from-background/95 group-hover:via-background/90 group-hover:to-background/95 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[0.5px]"></div>
                </>
              )}
              
              <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              
              <div className="relative z-10 p-8">
                <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <service.icon className="text-primary-foreground" size={28} />
                </div>
                
                <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                
                {service.features && (
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="mt-auto">
                  <Button 
                    variant="premium"
                    className="w-full"
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
          onSelectPayment={() => {
            setSelectedService(null);
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      )}
    </section>
  );
};

export default ServicesSection;