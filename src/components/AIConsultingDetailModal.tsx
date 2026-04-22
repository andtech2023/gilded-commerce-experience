import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, TrendingUp, Shield, Zap, Users, BarChart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AIConsultingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPayment: () => void;
}

const AIConsultingDetailModal = ({ isOpen, onClose, onSelectPayment }: AIConsultingDetailModalProps) => {
  const { language } = useLanguage();
  const tr = (es: string, ca: string) => (language === "ca" ? ca : es);
  const benefits = [
    { icon: Brain, title: tr("Análisis Inteligente", "Anàlisi Intel·ligent"), description: tr("Evaluación completa de oportunidades de IA en su empresa", "Avaluació completa d'oportunitats d'IA a la seva empresa") },
    { icon: TrendingUp, title: tr("ROI Garantizado", "ROI Garantit"), description: tr("Implementaciones que generan retorno medible desde el día 1", "Implementacions que generen retorn mesurable des del dia 1") },
    { icon: Shield, title: tr("Seguridad y Ética", "Seguretat i Ètica"), description: tr("Cumplimiento de normativas europeas y mejores prácticas", "Compliment de normatives europees i millors pràctiques") },
    { icon: Zap, title: tr("Implementación Rápida", "Implementació Ràpida"), description: tr("Resultados visibles en semanas, no meses", "Resultats visibles en setmanes, no mesos") },
    { icon: Users, title: tr("Formación Incluida", "Formació Inclosa"), description: tr("Capacitación completa para su equipo", "Capacitació completa per al seu equip") },
    { icon: BarChart, title: tr("Métricas y KPIs", "Mètriques i KPIs"), description: tr("Dashboard personalizado para medir el impacto", "Dashboard personalitzat per mesurar l'impacte") }
  ];

  const useCases = [
    { title: tr("Automatización de Procesos", "Automatització de Processos"), description: tr("Reducción del 70% en tareas repetitivas", "Reducció del 70% en tasques repetitives"), image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop" },
    { title: tr("Atención al Cliente 24/7", "Atenció al Client 24/7"), description: tr("Chatbots inteligentes con comprensión natural", "Chatbots intel·ligents amb comprensió natural"), image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=450&fit=crop" },
    { title: tr("Análisis Predictivo", "Anàlisi Predictiva"), description: tr("Anticipación de tendencias y demanda del mercado", "Anticipació de tendències i demanda del mercat"), image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop" }
  ];

  const process = [
    { phase: tr("Auditoría", "Auditoria"), duration: tr("1 semana", "1 setmana"), description: tr("Análisis completo de su infraestructura actual", "Anàlisi completa de la seva infraestructura actual") },
    { phase: tr("Estrategia", "Estratègia"), duration: tr("2 semanas", "2 setmanes"), description: tr("Diseño de roadmap personalizado de IA", "Disseny de roadmap personalitzat d'IA") },
    { phase: tr("Piloto", "Pilot"), duration: tr("4 semanas", "4 setmanes"), description: tr("Implementación de proyecto piloto", "Implementació de projecte pilot") },
    { phase: tr("Escalado", "Escalat"), duration: tr("Continuo", "Continu"), description: tr("Expansión gradual y optimización", "Expansió gradual i optimització") }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif">
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              {tr("Asesoría Empresarial en IA", "Assessoria Empresarial en IA")}
            </span>
          </DialogTitle>
          <DialogDescription className="text-lg mt-2">
            {tr(
              "Transforme su empresa con inteligencia artificial de vanguardia. Soluciones personalizadas que aumentan la eficiencia hasta un 300%.",
              "Transformi la seva empresa amb intel·ligència artificial d'avantguarda. Solucions personalitzades que augmenten l'eficiència fins a un 300%."
            )}
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
          <h3 className="text-xl font-semibold mb-4 text-foreground">{tr("Casos de Éxito", "Casos d'Èxit")}</h3>
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
          <h3 className="text-xl font-semibold mb-4 text-foreground">{tr("Proceso de Implementación", "Procés d'Implementació")}</h3>
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
          <h3 className="text-lg font-semibold mb-3">{tr("Tecnologías que Implementamos", "Tecnologies que Implementem")}</h3>
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
              <p className="text-sm text-muted-foreground mb-1">{tr("Inversión mensual desde", "Inversió mensual des de")}</p>
              <p className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                €2,499/{tr("mes", "mes")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {tr("* Primera consultoría GRATIS", "* Primera consultoria GRATIS")}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                {tr("Volver", "Tornar")}
              </Button>
              <Button variant="premium" onClick={onSelectPayment} className="group">
                {tr("Solicitar Consultoría", "Sol·licitar Consultoria")}
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