import { useState, useEffect, useRef } from "react";
import { Volume2, Pause, Play, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

interface BenefitAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  benefit: {
    title: string;
    description: string;
    icon: React.ReactNode;
    audioPath: string;
    subtitles: Subtitle[];
  } | null;
}

const BenefitAudioModal = ({ isOpen, onClose, benefit }: BenefitAudioModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  const cleanup = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setIsLoading(false);
    setProgress(0);
    setCurrentSubtitle("");
    setError(null);
  };

  useEffect(() => {
    if (isOpen && benefit) {
      playAudio();
    } else {
      cleanup();
    }

    return () => cleanup();
  }, [isOpen, benefit]);

  const updateSubtitle = (currentTime: number) => {
    if (!benefit?.subtitles) return;
    
    const subtitle = benefit.subtitles.find(
      (s) => currentTime >= s.start && currentTime < s.end
    );
    setCurrentSubtitle(subtitle?.text || "");
  };

  const playAudio = async () => {
    if (!benefit) return;

    setIsLoading(true);
    setError(null);

    try {
      const audio = new Audio(benefit.audioPath);
      audioRef.current = audio;

      audio.addEventListener("loadeddata", () => {
        setIsLoading(false);
        audio.play().catch(err => {
          console.error("Error playing audio:", err);
          setError("No se pudo reproducir el audio");
          setIsLoading(false);
        });
        setIsPlaying(true);

        intervalRef.current = window.setInterval(() => {
          if (audio.duration) {
            const currentProgress = (audio.currentTime / audio.duration) * 100;
            setProgress(currentProgress);
            updateSubtitle(audio.currentTime);
          }
        }, 100);
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(100);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      });

      audio.addEventListener("error", () => {
        setError("Error al cargar el audio");
        setIsLoading(false);
      });

    } catch (err) {
      setError("Error al iniciar la reproducción");
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    cleanup();
    onClose();
  };

  if (!benefit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-serif">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              {benefit.icon}
            </div>
            <span>{benefit.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Audio indicator */}
          <div className="flex items-center justify-center gap-3">
            <div className={`p-4 rounded-full bg-primary/10 border border-primary/30 ${isPlaying ? 'animate-pulse' : ''}`}>
              <Volume2 className="w-8 h-8 text-primary" />
            </div>
            {isLoading && (
              <span className="text-sm text-muted-foreground">Cargando audio...</span>
            )}
          </div>

          {/* Subtitle display - for accessibility */}
          <div className="min-h-[100px] p-4 rounded-lg bg-card border border-border flex items-center justify-center">
            {error ? (
              <p className="text-destructive text-center">{error}</p>
            ) : currentSubtitle ? (
              <p className="text-lg text-center font-medium leading-relaxed animate-fade-in">
                {currentSubtitle}
              </p>
            ) : (
              <p className="text-muted-foreground text-center text-sm">
                {isLoading ? "Preparando subtítulos..." : benefit.description}
              </p>
            )}
          </div>

          {/* Progress bar */}
          <Progress value={progress} className="h-2" />

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={togglePlayPause}
              disabled={isLoading || !!error}
              className="w-12 h-12 rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="w-12 h-12 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Accessibility note */}
          <p className="text-xs text-muted-foreground text-center">
            🔊 Subtítulos disponibles para accesibilidad
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitAudioModal;
