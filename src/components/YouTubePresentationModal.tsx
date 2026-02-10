import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface YouTubePresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const YouTubePresentationModal = ({ isOpen, onClose }: YouTubePresentationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 border-none bg-black/95 backdrop-blur-xl rounded-2xl overflow-hidden [&>button]:hidden">
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        >
          <X className="h-5 w-5 text-white group-hover:text-primary transition-colors" />
        </button>

        {/* Video container */}
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="w-full h-full max-w-[1600px] rounded-xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.15)]">
            <iframe
              src={isOpen ? "https://www.youtube.com/embed/et_TKRO6P-o?autoplay=1&rel=0&modestbranding=1" : ""}
              title="Presentación AndorraTech"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YouTubePresentationModal;
