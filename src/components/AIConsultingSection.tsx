import { Brain, TrendingUp, Users, Zap, BarChart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AIConsultingDetailModal from "./AIConsultingDetailModal";
import PaymentModal from "./PaymentModal";
import aiBackground from "@/assets/ai-consulting-bg.jpg";

const features = [
  {
    icon: Brain,
    title: "Inteligencia Artificial Personalizada",
    description: "Desarrollamos soluciones de IA adaptadas a las necesidades específicas de su empresa"
  },
  {
    icon: TrendingUp,
    title: "Automatización de Procesos",
    description: "Optimizamos sus operaciones mediante automatización inteligente"
  },
  {
    icon: Users,
    title: "Asistentes Virtuales",
    description: "Chatbots y asistentes IA para mejorar la atención al cliente 24/7"
  },
  {
    icon: BarChart,
    title: "Análisis Predictivo",
    description: "Transforme sus datos en insights accionables con machine learning"
  },
  {
    icon: Zap,
    title: "Integración Rápida",
    description: "Implementación ágil de soluciones IA en su infraestructura existente"
  },
  {
    icon: Shield,
    title: "IA Ética y Segura",
    description: "Desarrollo responsable con máximos estándares de seguridad y privacidad"
  }
];

const AIConsultingSection = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    service: "Asesoría Empresarial en IA",
    price: "€2,499/mes",
  });

  const handlePayment = () => {
    setShowDetail(false);
    setPaymentModal({ ...paymentModal, isOpen: true });
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
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="bg-gradient-gold bg-clip-text text-transparent">Asesoría Empresas</span> en IA
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
              className="group p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
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
              onClick={() => setShowDetail(true)}
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

      {/* AI Consulting Detail Modal */}
      <AIConsultingDetailModal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        onSelectPayment={handlePayment}
      />

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

export default AIConsultingSection;