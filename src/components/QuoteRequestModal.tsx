import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
}

const QuoteRequestModal = ({ isOpen, onClose, serviceTitle }: QuoteRequestModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = serviceTitle 
        ? `Servicio: ${serviceTitle}\n\n${formData.message}`
        : formData.message;

      const { error } = await supabase
        .from('contactos_formulario')
        .insert({
          nombre: formData.name,
          apellido: '',
          email: formData.email,
          telefono: formData.phone || null,
          mensaje: message,
          Presupuesto: formData.budget || null,
          pagina_origen: window.location.href,
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || null,
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || null,
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || null
        });

      if (error) throw error;

      toast.success("Solicitud enviada con éxito", {
        description: "Nos pondremos en contacto con usted pronto.",
      });
      setFormData({ name: "", email: "", phone: "", message: "", budget: "" });
      onClose();
    } catch (error) {
      console.error('Error saving quote request:', error);
      toast.error("Error al enviar la solicitud", {
        description: "Por favor, inténtelo de nuevo o contáctenos directamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-gradient-gold">
            Solicitar Presupuesto
          </DialogTitle>
          {serviceTitle && (
            <p className="text-sm text-muted-foreground mt-2">
              Para: <span className="font-semibold text-foreground">{serviceTitle}</span>
            </p>
          )}
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2"
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2"
              placeholder="juan@ejemplo.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Teléfono (Opcional)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2"
              placeholder="+376 123 456"
            />
          </div>

          <div>
            <Label htmlFor="budget">Rango de Presupuesto</Label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            >
              <option value="">Seleccionar presupuesto</option>
              <option value="menos-2000">Menos de 2.000€</option>
              <option value="menos-5000">Menos de 5.000€</option>
              <option value="mas-6000">Más de 6.000€</option>
            </select>
          </div>

          <div>
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-2 min-h-[100px]"
              placeholder="Cuéntenos sobre su proyecto..."
            />
          </div>

          <Button 
            type="submit" 
            variant="premium" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            <Send className="mr-2" size={20} />
            {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
