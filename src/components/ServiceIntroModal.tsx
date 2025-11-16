import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Volume2, Loader2 } from "lucide-react";
import { getServiceIntroScript } from "@/utils/serviceIntroScripts";

interface ServiceIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    icon: any;
  };
}

const ServiceIntroModal = ({ isOpen, onClose, service }: ServiceIntroModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
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

  const playIntro = async () => {
    try {
      setIsLoading(true);
      const script = getServiceIntroScript(service.title);
      
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text: script, voice: 'nova' }
      });

      if (error) throw error;

      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      audioRef.current = audio;
      
      audio.onended = () => {
        setTimeout(() => {
          onClose();
        }, 500);
      };

      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);

      // Simulate progress (aprox 30 seconds)
      let currentProgress = 0;
      progressInterval.current = setInterval(() => {
        currentProgress += (100 / 300); // 30 seconds / 100ms intervals
        if (currentProgress >= 100) {
          currentProgress = 100;
          if (progressInterval.current) clearInterval(progressInterval.current);
        }
        setProgress(currentProgress);
      }, 100);

    } catch (error) {
      console.error('Error playing intro:', error);
      setIsLoading(false);
      setTimeout(onClose, 1000);
    }
  };

  const Icon = service.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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

            {/* Audio indicator */}
            <div className="flex items-center justify-center gap-3 animate-fade-in delay-300">
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  <span className="text-sm text-muted-foreground">Preparando presentación...</span>
                </>
              ) : isPlaying ? (
                <>
                  <Volume2 className="w-6 h-6 text-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">Reproduciendo presentación...</span>
                </>
              ) : null}
            </div>

            {/* Progress bar */}
            {isPlaying && (
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden animate-fade-in">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-futuristic-gold transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Animated dots */}
            <div className="flex justify-center gap-2 pt-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/50 animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceIntroModal;
