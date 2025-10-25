import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import semSeoCampaign from "@/assets/sem-seo-campaign.jpg";

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    price?: string;
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
  
  // Service-specific content
  const getServiceContent = () => {
    const serviceData: Record<string, any> = {
      "Desarrollo Web - Básico": {
        description: "Solución web perfecta para pequeñas empresas y emprendedores. Obtenga una presencia online profesional con todas las funcionalidades esenciales para comenzar a captar clientes.",
        features: [
          "Hasta 5 páginas web profesionales",
          "Diseño responsive adaptado a todos los dispositivos",
          "SEO básico para mejorar tu posicionamiento en Google",
          "Formulario de contacto integrado con notificaciones",
          "Hosting profesional incluido por 1 año completo",
          "Certificado SSL gratuito para seguridad HTTPS",
          "Integración con redes sociales",
          "Mantenimiento básico incluido durante 3 meses"
        ],
        technologies: ["React", "HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
        timeline: "2-3 semanas",
        portfolio: [
          { 
            title: "Web Corporativa Básica", 
            description: "Sitio web profesional con diseño moderno y funcional para pequeñas empresas",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
          }
        ]
      },
      "Desarrollo Web - Profesional": {
        description: "La solución ideal para empresas en crecimiento que necesitan funcionalidades avanzadas. Incluye todo lo necesario para vender online y gestionar su negocio digital de forma eficiente.",
        features: [
          "Hasta 10 páginas web con diseño personalizado",
          "Pasarela de pago integrada (Stripe, PayPal, Redsys)",
          "Panel de administración completo y fácil de usar",
          "SEO avanzado y optimización de velocidad de carga",
          "Google Analytics y métricas detalladas del negocio",
          "Hosting premium incluido por 1 año",
          "Certificado SSL profesional",
          "Blog integrado con sistema CMS",
          "Chat en vivo para atención al cliente",
          "Soporte técnico prioritario durante 6 meses"
        ],
        technologies: ["React", "Node.js", "Supabase", "TypeScript", "Stripe API", "Google Analytics"],
        timeline: "4-6 semanas",
        portfolio: [
          { 
            title: "E-commerce Profesional", 
            description: "Tienda online completa con pasarela de pago y gestión de inventario automatizada",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop"
          },
          { 
            title: "Portal de Servicios", 
            description: "Plataforma con reservas online, pagos y área de clientes",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
          }
        ]
      },
      "Desarrollo Web - Premium": {
        description: "Solución empresarial completa sin límites. Perfecta para grandes empresas que buscan la máxima personalización, rendimiento y soporte. Incluye las últimas tecnologías en IA y automatización.",
        features: [
          "Páginas ilimitadas con diseño 100% personalizado",
          "E-commerce completo con gestión avanzada de productos",
          "Integraciones con APIs externas ilimitadas",
          "Inteligencia Artificial integrada (chatbots, recomendaciones)",
          "Soporte multiidioma completo con traducciones",
          "Soporte técnico 24/7 prioritario todo el año",
          "Hosting premium de alta velocidad en servidores dedicados",
          "Backups automáticos diarios con recuperación instantánea",
          "Sistema de reservas/citas online con calendario",
          "Dashboard analytics personalizado con KPIs del negocio",
          "Optimización continua de rendimiento y conversión",
          "Formación personalizada para tu equipo (8 horas incluidas)"
        ],
        technologies: ["React", "Node.js", "Supabase", "TypeScript", "OpenAI API", "AWS", "Docker", "GraphQL"],
        timeline: "8-12 semanas",
        portfolio: [
          { 
            title: "Plataforma SaaS Completa", 
            description: "Solución empresarial con IA, analytics avanzado y automatización de procesos",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
          },
          { 
            title: "Marketplace Multi-vendor", 
            description: "Plataforma completa con múltiples vendedores y sistema de comisiones",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop"
          },
          { 
            title: "Portal Corporativo Internacional", 
            description: "Web multiidioma con áreas privadas y gestión de contenidos avanzada",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
          }
        ]
      },
      "Desarrollo Web": {
        description: "Creamos aplicaciones web modernas utilizando las últimas tecnologías. Desde sitios corporativos hasta plataformas complejas de e-commerce, garantizamos rendimiento, escalabilidad y una experiencia de usuario excepcional.",
        videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
        features: [
          "Diseño responsive y optimizado para móviles",
          "SEO técnico avanzado para máxima visibilidad",
          "Integración con APIs y servicios externos",
          "Panel de administración personalizado",
          "Análisis y métricas en tiempo real",
          "Certificado SSL y seguridad HTTPS"
        ],
        technologies: ["React", "Vue.js", "Next.js", "Node.js", "PostgreSQL", "Redis"],
        timeline: "4-8 semanas",
        portfolio: [
          { 
            title: "E-commerce Premium", 
            description: "Tienda online con pagos integrados, gestión de inventario y análisis avanzado",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop"
          },
          { 
            title: "Portal Corporativo", 
            description: "Web corporativa con CMS, blog integrado y área privada de clientes",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
          },
          { 
            title: "Aplicación SaaS", 
            description: "Plataforma multi-tenant con suscripciones y facturación automática",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
          }
        ]
      },
      "Apps Móviles": {
        description: "Desarrollamos aplicaciones móviles nativas y multiplataforma que ofrecen experiencias fluidas y atractivas. Optimizadas para rendimiento y con todas las funcionalidades que sus usuarios necesitan.",
        videoUrl: "https://www.youtube.com/embed/VpIwQOFTm0k",
        features: [
          "Desarrollo nativo iOS y Android",
          "Notificaciones push personalizadas",
          "Integración con servicios del dispositivo",
          "Sincronización offline/online",
          "Publicación en App Store y Google Play",
          "Actualizaciones OTA (Over-The-Air)"
        ],
        technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL"],
        timeline: "8-12 semanas",
        portfolio: [
          { 
            title: "App de Delivery", 
            description: "Aplicación nativa con seguimiento GPS en tiempo real y pagos integrados",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop"
          },
          { 
            title: "Red Social Empresarial", 
            description: "Plataforma de comunicación interna con chat y videollamadas",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop"
          },
          { 
            title: "App de Fitness", 
            description: "Seguimiento de entrenamientos con wearables y análisis de datos",
            image: "https://images.unsplash.com/photo-1594737626072-90dc274bc2bd?w=800&h=450&fit=crop"
          }
        ]
      },
      "ChatBot IA con Voz Humana": {
        description: "Revolucione la atención al cliente con nuestro ChatBot IA equipado con tecnología de voz humana natural. Una solución completa que combina inteligencia artificial avanzada con síntesis de voz de última generación para ofrecer experiencias conversacionales indistinguibles de un agente humano.",
        videoUrl: "", // Pendiente de video
        detailedDescription: "Nuestro ChatBot IA con Voz Humana representa el futuro de la atención al cliente automatizada. Utilizando modelos de lenguaje de última generación combinados con tecnología de síntesis de voz neural, creamos asistentes virtuales que no solo entienden el contexto y las intenciones de sus clientes, sino que responden con una voz natural, cálida y profesional que genera confianza y mejora la experiencia del usuario.\n\nLa solución incluye procesamiento de lenguaje natural (NLP) avanzado que permite comprender consultas complejas, mantener el contexto de conversaciones largas, y proporcionar respuestas precisas y personalizadas. El sistema de voz utiliza tecnología de síntesis neural que reproduce entonaciones, pausas y énfasis naturales, haciendo que la interacción sea fluida y agradable.\n\nPerfecto para empresas que buscan escalar su atención al cliente sin comprometer la calidad, disponible 24/7 en múltiples idiomas, con capacidad de aprendizaje continuo y mejora basada en las interacciones reales con sus clientes.",
        features: [
          "Voz humana natural con tecnología de síntesis neural de última generación",
          "Respuestas inteligentes en tiempo real con contexto conversacional",
          "Integración completa con WhatsApp, Telegram y plataformas web",
          "Disponibilidad 24/7 sin interrupciones ni tiempos de espera",
          "Procesamiento de lenguaje natural en múltiples idiomas",
          "Personalización completa de personalidad y tono de voz",
          "Aprendizaje automático continuo desde las interacciones",
          "Panel de analytics con métricas detalladas de conversaciones",
          "Transferencia inteligente a agentes humanos cuando es necesario",
          "Base de conocimiento personalizada para su negocio específico",
          "Reconocimiento de emociones y adaptación de respuestas",
          "Cumplimiento total con normativas de privacidad y GDPR"
        ],
        technologies: ["OpenAI GPT-5", "ElevenLabs Voice AI", "Whisper ASR", "WebRTC", "Node.js", "React", "Supabase", "WhatsApp Business API"],
        timeline: "4-6 semanas",
        portfolio: [
          { 
            title: "Caso de Éxito Real - Video Demostrativo", 
            description: "Próximamente disponible: Video completo mostrando implementación real y resultados medibles",
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=450&fit=crop"
          },
          { 
            title: "Asistente Virtual E-commerce", 
            description: "ChatBot con voz que atiende consultas de productos, procesa pedidos y resuelve incidencias 24/7",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=450&fit=crop"
          },
          { 
            title: "Soporte Técnico Automatizado", 
            description: "Sistema de voz IA que diagnostica problemas técnicos y guía a usuarios paso a paso",
            image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop"
          }
        ]
      },
      "Marketing Digital": {
        description: "Maximizamos su presencia online con estrategias de marketing digital basadas en datos. Aumentamos su visibilidad, generamos leads cualificados y mejoramos su ROI.",
        videoUrl: "https://www.youtube.com/embed/nMEHJPuggHQ",
        features: [
          "Estrategia SEO y SEM personalizada",
          "Gestión profesional de redes sociales",
          "Email marketing automatizado",
          "Análisis de competencia detallado",
          "Optimización de conversión (CRO)",
          "Informes mensuales con KPIs"
        ],
        technologies: ["Google Ads", "Meta Business", "HubSpot", "Mailchimp", "Analytics", "Semrush"],
        timeline: "Servicio mensual",
        portfolio: [
          { 
            title: "Campaña SEO/SEM", 
            description: "Estrategia completa con 300% de aumento en tráfico orgánico",
            image: semSeoCampaign
          },
          { 
            title: "Automatización Marketing", 
            description: "Workflows automatizados para nurturing de leads B2B",
            image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=450&fit=crop"
          },
          { 
            title: "Analytics Dashboard", 
            description: "Panel personalizado con KPIs y métricas en tiempo real",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
          }
        ]
      },
      "IA & Machine Learning": {
        description: "Implementamos soluciones de inteligencia artificial que transforman sus datos en insights accionables y automatizan procesos complejos para mejorar la eficiencia operativa.",
        videoUrl: "https://www.youtube.com/embed/2ePf9rue1Ao",
        features: [
          "Modelos de IA personalizados",
          "Procesamiento de lenguaje natural",
          "Análisis predictivo avanzado",
          "Automatización inteligente de procesos",
          "Computer Vision y reconocimiento",
          "Integración con sistemas existentes"
        ],
        technologies: ["TensorFlow", "PyTorch", "OpenAI API", "Langchain", "Hugging Face", "Azure ML"],
        timeline: "6-12 semanas",
        portfolio: [
          { 
            title: "Chatbot Inteligente", 
            description: "Asistente virtual con procesamiento de lenguaje natural avanzado",
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=450&fit=crop"
          },
          { 
            title: "Sistema Predictivo", 
            description: "Modelo ML para predicción de ventas con 95% de precisión",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
          },
          { 
            title: "Visión por Computadora", 
            description: "Reconocimiento y clasificación automática de productos",
            image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=450&fit=crop"
          }
        ]
      }
    };

    return serviceData[service?.title] || serviceData["Desarrollo Web"];
  };

  const content = getServiceContent();
  const details = service.details || content;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif bg-gradient-gold bg-clip-text text-transparent">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-lg mt-2">
            {details.description || service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Features Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Características Incluidas</h3>
            <ul className="space-y-3">
              {details.features.map((feature: string, index: number) => (
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
                    {details.technologies.map((tech: string, index: number) => (
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
                {details.portfolio.map((_: any, index: number) => (
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

        {/* Action Buttons */}
        <div className="mt-8 p-6 bg-gradient-subtle rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-lg text-muted-foreground">
                {service.title === "ChatBot IA con Voz Humana" 
                  ? "¿Tienes dudas? Habla ahora con nuestro ATBot y descubre cómo puede transformar tu negocio."
                  : "¿Interesado en este servicio? Contáctenos para recibir un presupuesto personalizado."
                }
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Volver
              </Button>
              {service.title === "ChatBot IA con Voz Humana" ? (
                <Button 
                  variant="premium" 
                  onClick={() => {
                    const message = encodeURIComponent("Hola, estoy interesado en el servicio de ChatBot IA con Voz Humana. ¿Podrían darme más información?");
                    window.open(`https://wa.me/376369939?text=${message}`, '_blank');
                  }}
                  className="group bg-gradient-gold hover:bg-[#25D366] transition-all duration-300"
                >
                  💬 Hablar con ATBot
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              ) : (
                <Button variant="premium" onClick={onSelectPayment} className="group">
                  Solicitar Presupuesto
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;