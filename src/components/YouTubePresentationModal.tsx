import { useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface YouTubePresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const YouTubePresentationModal = ({ isOpen, onClose }: YouTubePresentationModalProps) => {
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Load YouTube IFrame API if not loaded
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const initPlayer = () => {
      playerRef.current = new (window as any).YT.Player("yt-presentation-player", {
        videoId: "et_TKRO6P-o",
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1 },
        events: {
          onStateChange: (event: any) => {
            // State 0 = ended
            if (event.data === 0) {
              onClose();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          },
        },
      });
    };

    // Wait for API to be ready
    if ((window as any).YT && (window as any).YT.Player) {
      setTimeout(initPlayer, 100);
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current?.destroy) playerRef.current.destroy();
      playerRef.current = null;
    };
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 border-none bg-black/95 backdrop-blur-xl rounded-2xl overflow-hidden [&>button]:hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        >
          <X className="h-5 w-5 text-white group-hover:text-primary transition-colors" />
        </button>

        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="w-full h-full max-w-[1600px] rounded-xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.15)]">
            <div id="yt-presentation-player" className="w-full h-full" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YouTubePresentationModal;
