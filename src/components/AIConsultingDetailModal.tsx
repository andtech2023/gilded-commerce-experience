import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, TrendingUp, Shield, Zap, Users, BarChart } from "lucide-react";

interface AIConsultingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPayment: () => void;
}

const AIConsultingDetailModal = ({ isOpen, onClose, onSelectPayment }: AIConsultingDetailModalProps) => {
  const benefits = [
    {
      icon: Brain,
      title: "Análisis Inteligente",
      description: "Evaluación completa de oportunidades de IA en su empresa"
    },
    {
      icon: TrendingUp,
      title: "ROI Garantizado",
      description: "Implementaciones que generan retorno medible desde el día 1"
    },
    {
      icon: Shield,
      title: "Seguridad y Ética",
      description: "Cumplimiento de normativas europeas y mejores prácticas"
    },
    {
      icon: Zap,
      title: "Implementación Rápida",
      description: "Resultados visibles en semanas, no meses"
    },
    {
      icon: Users,
      title: "Formación Incluida",
      description: "Capacitación completa para su equipo"
    },
    {
      icon: BarChart,
      title: "Métricas y KPIs",
      description: "Dashboard personalizado para medir el impacto"
    }
  ];

  const useCases = [
    {
      title: "Automatización de Procesos",
      description: "Reducción del 70% en tareas repetitivas",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop"
    },
    {
      title: "Atención al Cliente 24/7",
      description: "Chatbots inteligentes con comprensión natural",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=450&fit=crop"
    },
    {
      title: "Análisis Predictivo",
      description: "Anticipación de tendencias y demanda del mercado",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
    }
  ];

  const process = [
    { phase: "Auditoría", duration: "1 semana", description: "Análisis completo de su infraestructura actual" },
    { phase: "Estrategia", duration: "2 semanas", description: "Diseño de roadmap personalizado de IA" },
    { phase: "Piloto", duration: "4 semanas", description: "Implementación de proyecto piloto" },
    { phase: "Escalado", duration: "Continuo", description: "Expansión gradual y optimización" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif">
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              Asesoría Empresarial en IA
            </span>
          </DialogTitle>
          <DialogDescription className="text-lg mt-2">
            Transforme su empresa con inteligencia artificial de vanguardia. 
            Soluciones personalizadas que aumentan la eficiencia hasta un 300%.
          </DialogDescription>
        </DialogHeader>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card/50 hover:bg-card transition-colors">
              <CardContent className="pt-6">
                <benefit.icon className="text-primary mb-3" size={32} />
                <h4 className="font-semibold mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Use Cases */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Casos de Éxito</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img 
                  src={useCase.image} 
                  alt={useCase.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex flex-col justify-end p-4">
                  <h4 className="text-white font-semibold mb-1">{useCase.title}</h4>
                  <p className="text-white/80 text-sm">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Proceso de Implementación</h3>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20"></div>
            <div className="space-y-6">
              {process.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-card/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{step.phase}</h4>
                      <span className="text-sm text-primary">{step.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-8 p-6 bg-gradient-subtle rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Tecnologías que Implementamos</h3>
          <div className="flex flex-wrap gap-2">
            {["OpenAI GPT-4", "Claude 3", "TensorFlow", "PyTorch", "LangChain", "Vector Databases", 
              "Computer Vision", "NLP", "Machine Learning", "Deep Learning", "AutoML", "MLOps"].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 p-6 bg-card border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Inversión mensual desde</p>
              <p className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                €2,499/mes
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                * Primera consultoría GRATIS
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Volver
              </Button>
              <Button variant="premium" onClick={onSelectPayment} className="group">
                Solicitar Consultoría
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIConsultingDetailModal;