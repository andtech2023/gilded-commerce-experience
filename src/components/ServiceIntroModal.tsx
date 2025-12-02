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

const ServiceIntroModal = ({ isOpen, onClose, service }: ServiceIntroModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

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
  };

  const handleClose = () => {
    cleanup();
    onClose();
    // Navegar al formulario de contacto
    setTimeout(() => {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
          
          // Actualizar progreso basado en la duración real del audio
          const duration = audio.duration;
          progressInterval.current = setInterval(() => {
            if (audioRef.current) {
              const currentProgress = (audioRef.current.currentTime / duration) * 100;
              setProgress(currentProgress);
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
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span className="text-gradient-gold animate-fade-in">{service.title}</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground animate-fade-in delay-200 max-w-md mx-auto">
              {service.description}
            </p>

            {/* Audio indicator or error */}
            <div className="flex items-center justify-center gap-3 animate-fade-in delay-300">
              {error ? (
                <div className="text-center space-y-2">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                  <button 
                    onClick={handleClose}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Solicitar Presupuesto
                  </button>
                </div>
              ) : isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  <span className="text-sm text-muted-foreground">Cargando audio...</span>
                </>
              ) : isPlaying ? (
                <>
                  <Volume2 className="w-6 h-6 text-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">Reproduciendo presentación...</span>
                </>
              ) : (
                <button 
                  onClick={handleClose}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-primary to-futuristic-gold text-primary-foreground rounded-md hover:opacity-90 transition-all font-semibold"
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

            {/* Close button when audio finished */}
            {!isPlaying && !isLoading && !error && (
              <p className="text-xs text-muted-foreground mt-4">
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
