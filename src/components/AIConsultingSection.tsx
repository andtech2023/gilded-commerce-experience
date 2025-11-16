import { Brain, TrendingUp, Users, Zap, BarChart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AIFeatureModal from "./AIFeatureModal";
import ServiceIntroModal from "./ServiceIntroModal";
import QuoteRequestModal from "./QuoteRequestModal";
import aiBackground from "@/assets/ai-consulting-bg.jpg";

const features = [
  {
    icon: Brain,
    title: "Inteligencia Artificial Personalizada",
    description: "Desarrollamos soluciones de IA adaptadas a las necesidades específicas de su empresa",
    detailedDescription: "Nuestro equipo de expertos en IA diseña e implementa soluciones personalizadas que se integran perfectamente con sus procesos empresariales existentes. Desde chatbots avanzados hasta sistemas de recomendación, creamos tecnología que impulsa su negocio.",
    benefits: [
      "Análisis de necesidades y consultoría inicial gratuita",
      "Desarrollo a medida según sus requisitos específicos",
      "Integración con sus sistemas actuales",
      "Formación completa para su equipo",
      "Soporte técnico continuado"
    ]
  },
  {
    icon: TrendingUp,
    title: "Automatización de Procesos",
    description: "Optimizamos sus operaciones mediante automatización inteligente",
    detailedDescription: "Identificamos y automatizamos procesos repetitivos en su empresa, liberando tiempo valioso de su equipo para tareas estratégicas. Utilizamos IA para crear flujos de trabajo inteligentes que aprenden y mejoran con el tiempo.",
    benefits: [
      "Reducción de hasta 80% en tareas repetitivas",
      "Minimización de errores humanos",
      "Aumento de productividad del equipo",
      "ROI medible en 3-6 meses",
      "Escalabilidad según crecimiento"
    ]
  },
  {
    icon: Users,
    title: "Asistentes Virtuales",
    description: "Chatbots y asistentes IA para mejorar la atención al cliente 24/7",
    detailedDescription: "Implementamos asistentes virtuales inteligentes que brindan atención al cliente las 24 horas, responden preguntas frecuentes, procesan solicitudes y escalan casos complejos a su equipo humano cuando es necesario.",
    benefits: [
      "Atención al cliente 24/7 sin interrupciones",
      "Respuesta instantánea a consultas frecuentes",
      "Reducción de carga de trabajo en servicio al cliente",
      "Recopilación automática de datos de clientes",
      "Mejora continua mediante machine learning"
    ]
  },
  {
    icon: BarChart,
    title: "Análisis Predictivo",
    description: "Transforme sus datos en insights accionables con machine learning",
    detailedDescription: "Convertimos sus datos históricos en predicciones valiosas que impulsan decisiones estratégicas. Nuestros modelos de machine learning identifican patrones, tendencias y oportunidades que serían imposibles de detectar manualmente.",
    benefits: [
      "Predicción de tendencias de mercado",
      "Optimización de inventario y recursos",
      "Identificación de oportunidades de ventas",
      "Detección temprana de riesgos",
      "Dashboards interactivos y reportes automatizados"
    ]
  },
  {
    icon: Zap,
    title: "Integración Rápida",
    description: "Implementación ágil de soluciones IA en su infraestructura existente",
    detailedDescription: "Sabemos que el tiempo es crítico. Por eso ofrecemos metodologías ágiles de implementación que minimizan la interrupción de sus operaciones mientras maximizan el valor entregado.",
    benefits: [
      "Implementación por fases para menor riesgo",
      "Compatibilidad con sistemas legacy",
      "Tiempo de implementación optimizado",
      "Pruebas exhaustivas antes del lanzamiento",
      "Migración de datos segura y verificada"
    ]
  },
  {
    icon: Shield,
    title: "IA Ética y Segura",
    description: "Desarrollo responsable con máximos estándares de seguridad y privacidad",
    detailedDescription: "La seguridad y privacidad de sus datos es nuestra prioridad. Cumplimos con todas las normativas internacionales y aplicamos las mejores prácticas de seguridad en cada proyecto.",
    benefits: [
      "Cumplimiento total con RGPD y normativas locales",
      "Cifrado de datos en reposo y en tránsito",
      "Auditorías de seguridad regulares",
      "Transparencia en algoritmos y decisiones de IA",
      "Política de privacidad by design"
    ]
  }
];

const AIConsultingSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);
  const [introFeature, setIntroFeature] = useState<typeof features[0] | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const handleFeatureClick = (feature: typeof features[0]) => {
    setIntroFeature(feature);
  };

  const handleIntroComplete = () => {
    setSelectedFeature(introFeature);
    setIntroFeature(null);
  };

  return (
    <section 
      id="asesoria-ia" 
      className="py-20 bg-background relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(9, 9, 11, 0.9), rgba(9, 9, 11, 0.95)), url(${aiBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-beige-soft">Asesoría Empresas</span> <span className="text-futuristic-gold">en IA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transformamos su empresa con inteligencia artificial de vanguardia. 
            Desde la estrategia hasta la implementación, le acompañamos en cada paso de su viaje hacia la innovación.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer"
              onClick={() => handleFeatureClick(feature)}
            >
              <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
              <Button variant="link" className="mt-4 p-0 h-auto text-primary">
                Ver más →
              </Button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-subtle rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-serif font-bold mb-4">
            Comience su Transformación Digital con IA
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Agenda una consulta gratuita con nuestros expertos en IA y descubra cómo 
            podemos revolucionar su negocio con tecnología inteligente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="premium" 
              size="xl"
              onClick={() => setQuoteModalOpen(true)}
            >
              Solicitar Consulta Gratuita
            </Button>
            <Button variant="outline" size="xl">
              Descargar Guía IA
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">15+</div>
            <div className="text-sm text-muted-foreground">Proyectos IA Completados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">80%</div>
            <div className="text-sm text-muted-foreground">Reducción de Costes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">3x</div>
            <div className="text-sm text-muted-foreground">Aumento Productividad</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">100%</div>
            <div className="text-sm text-muted-foreground">Clientes Satisfechos</div>
          </div>
        </div>
      </div>

      {/* AI Feature Modal */}
      {selectedFeature && (
        <AIFeatureModal
          isOpen={!!selectedFeature}
          onClose={() => setSelectedFeature(null)}
          feature={selectedFeature}
        />
      )}

      {/* Intro Modal for AI Features */}
      {introFeature && (
        <ServiceIntroModal
          isOpen={!!introFeature}
          onClose={handleIntroComplete}
          service={{
            title: introFeature.title,
            description: introFeature.description,
            icon: introFeature.icon
          }}
        />
      )}
      
      {/* Quote Request Modal */}
      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        serviceTitle="Consultoría en Inteligencia Artificial"
      />
    </section>
  );
};

export default AIConsultingSection;