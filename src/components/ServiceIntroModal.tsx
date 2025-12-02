import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Volume2, Loader2 } from "lucide-react";

interface ServiceIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    icon: any;
  };
}

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

// Mapeo de títulos de servicio a archivos de audio
const getServiceAudioPath = (title: string): string | null => {
  const audioMap: Record<string, string> = {
    "Apps Móviles": "/audio/apps-moviles.mp3",
    "ChatBot IA con Voz Humana": "/audio/chatbot-ia.mp3",
    "Marketing Digital": "/audio/marketing-digital.mp3",
    "IA & Machine Learning": "/audio/ia-machine-learning.mp3",
  };
  return audioMap[title] || null;
};

// Subtítulos para cada servicio (tiempos en segundos)
const getServiceSubtitles = (title: string): Subtitle[] => {
  const subtitlesMap: Record<string, Subtitle[]> = {
    "Apps Móviles": [
      { start: 0, end: 4, text: "¿Buscas una aplicación móvil que impulse tu negocio?" },
      { start: 4, end: 8, text: "En AndorraTech desarrollamos apps nativas e híbridas" },
      { start: 8, end: 12, text: "para iOS y Android con diseño intuitivo y alto rendimiento." },
      { start: 12, end: 16, text: "Desde tiendas online hasta apps de gestión empresarial," },
      { start: 16, end: 20, text: "creamos soluciones a medida que conectan con tus clientes." },
      { start: 20, end: 24, text: "Automatizaciones personalizables incluidas." },
      { start: 24, end: 28, text: "Solicita tu presupuesto sin compromiso." },
    ],
    "ChatBot IA con Voz Humana": [
      { start: 0, end: 4, text: "¿Imaginas atender a tus clientes las 24 horas del día?" },
      { start: 4, end: 8, text: "Nuestros chatbots con inteligencia artificial" },
      { start: 8, end: 12, text: "ofrecen respuestas naturales con voz humana." },
      { start: 12, end: 16, text: "Integración con WhatsApp, Telegram y tu web." },
      { start: 16, end: 20, text: "Reducen costes y mejoran la experiencia del cliente." },
      { start: 20, end: 24, text: "Automatizaciones personalizables para tu negocio." },
      { start: 24, end: 28, text: "Descubre cómo transformar tu atención al cliente." },
    ],
    "Marketing Digital": [
      { start: 0, end: 4, text: "¿Quieres que tu marca destaque en el mundo digital?" },
      { start: 4, end: 8, text: "En AndorraTech creamos estrategias de marketing" },
      { start: 8, end: 12, text: "que generan resultados medibles y rentables." },
      { start: 12, end: 16, text: "SEO, SEM, redes sociales y campañas publicitarias." },
      { start: 16, end: 20, text: "Analizamos tu mercado y optimizamos cada acción." },
      { start: 20, end: 24, text: "Automatizaciones personalizables para maximizar tu ROI." },
      { start: 24, end: 28, text: "Haz crecer tu negocio con estrategias que funcionan." },
    ],
    "IA & Machine Learning": [
      { start: 0, end: 4, text: "¿Listo para que la tecnología tome decisiones por ti?" },
      { start: 4, end: 8, text: "La inteligencia artificial y el machine learning" },
      { start: 8, end: 12, text: "transforman datos en ventajas competitivas." },
      { start: 12, end: 16, text: "Predicción de ventas, análisis de patrones," },
      { start: 16, end: 20, text: "automatización de procesos y mucho más." },
      { start: 20, end: 24, text: "Soluciones personalizadas para tu industria." },
      { start: 24, end: 28, text: "Descubre el poder de la IA en tu empresa." },
    ],
  };
  return subtitlesMap[title] || [];
};

const ServiceIntroModal = ({ isOpen, onClose, service }: ServiceIntroModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const subtitles = getServiceSubtitles(service.title);

  useEffect(() => {
    if (isOpen) {
      playIntro();
    } else {
      cleanup();
    }
    
    return () => cleanup();
  }, [isOpen]);

  const cleanup = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentSubtitle("");
  };

  const handleClose = () => {
    cleanup();
    onClose();
    setTimeout(() => {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const updateSubtitle = (currentTime: number) => {
    const activeSubtitle = subtitles.find(
      sub => currentTime >= sub.start && currentTime < sub.end
    );
    setCurrentSubtitle(activeSubtitle?.text || "");
  };

  const playIntro = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const audioPath = getServiceAudioPath(service.title);
      
      if (!audioPath) {
        throw new Error('Audio no disponible para este servicio');
      }

      const audio = new Audio(audioPath);
      audioRef.current = audio;
      
      // Manejar errores de carga
      audio.onerror = () => {
        setError('Error al cargar el audio');
        setIsLoading(false);
      };

      // Cuando el audio está listo para reproducir
      audio.oncanplaythrough = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
          setIsLoading(false);
          
          const duration = audio.duration;
          progressInterval.current = setInterval(() => {
            if (audioRef.current) {
              const currentTime = audioRef.current.currentTime;
              const currentProgress = (currentTime / duration) * 100;
              setProgress(currentProgress);
              updateSubtitle(currentTime);
            }
          }, 100);
        } catch (playError) {
          console.error('Error playing audio:', playError);
          setError('Error al reproducir el audio');
          setIsLoading(false);
        }
      };
      
      audio.onended = () => {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
        setProgress(100);
        setIsPlaying(false);
        setCurrentSubtitle("");
      };

      // Cargar el audio
      audio.load();

    } catch (error) {
      console.error('Error playing intro:', error);
      setIsLoading(false);
      setError(error instanceof Error ? error.message : 'Error al reproducir la presentación');
    }
  };

  const Icon = service.icon;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="relative p-8 sm:p-12">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-futuristic-gold/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-6">
            {/* Icon with animation */}
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-futuristic-gold flex items-center justify-center animate-scale-in shadow-elegant">
              <Icon className="w-12 h-12 text-white animate-pulse" />
            </div>

            {/* Title with gradient */}
            <h2 className="text-3xl sm:text-4xl font-bold font-orbitron">
              <span className="text-gradient-gold animate-fade-in">{service.title}</span>
            </h2>

            {/* Subtitles area */}
            <div className="min-h-[80px] flex items-center justify-center">
              {currentSubtitle && (
                <p className="text-lg sm:text-xl font-rajdhani text-foreground animate-fade-in bg-background/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-primary/20">
                  {currentSubtitle}
                </p>
              )}
              {!currentSubtitle && !isPlaying && !isLoading && !error && (
                <p className="text-lg text-muted-foreground animate-fade-in max-w-md mx-auto font-rajdhani">
                  {service.description}
                </p>
              )}
            </div>

            {/* Audio indicator or error */}
            <div className="flex items-center justify-center gap-3 animate-fade-in delay-300">
              {error ? (
                <div className="text-center space-y-2">
                  <p className="text-sm text-destructive font-medium font-rajdhani">{error}</p>
                  <button 
                    onClick={handleClose}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-rajdhani"
                  >
                    Solicitar Presupuesto
                  </button>
                </div>
              ) : isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  <span className="text-sm text-muted-foreground font-rajdhani">Cargando audio...</span>
                </>
              ) : isPlaying ? (
                <>
                  <Volume2 className="w-6 h-6 text-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground font-rajdhani">Reproduciendo presentación...</span>
                </>
              ) : (
                <button 
                  onClick={handleClose}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-primary to-futuristic-gold text-primary-foreground rounded-md hover:opacity-90 transition-all font-semibold font-rajdhani"
                >
                  Solicitar Presupuesto
                </button>
              )}
            </div>

            {/* Progress bar */}
            {(isPlaying || isLoading) && (
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden animate-fade-in">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-futuristic-gold transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Animated dots while playing */}
            {(isPlaying || isLoading) && (
              <div className="flex justify-center gap-2 pt-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary/50 animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            )}

            {/* Accessibility note */}
            {!isPlaying && !isLoading && !error && (
              <p className="text-xs text-muted-foreground mt-4 font-rajdhani">
                Al cerrar serás redirigido al formulario de contacto
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceIntroModal;
