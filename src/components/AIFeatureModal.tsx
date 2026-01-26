import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { LucideIcon } from "lucide-react";
import { validateContactForm, sanitizeText } from "@/utils/contactFormValidation";
import ReCaptchaComponent, { ReCaptchaRef } from "@/components/ReCaptcha";
import { verifyRecaptcha } from "@/utils/recaptchaVerification";

interface AIFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
    detailedDescription?: string;
    benefits?: string[];
  };
}

const AIFeatureModal = ({ isOpen, onClose, feature }: AIFeatureModalProps) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const recaptchaRef = useRef<ReCaptchaRef>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    
    // Validate form data
    const validation = validateContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
    });

    if (!validation.success) {
      setValidationErrors(validation.errors);
      toast.error("Error de validación", {
        description: validation.errors[0],
      });
      return;
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      toast.error("Verificación requerida", {
        description: "Por favor, complete el captcha.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Verify reCAPTCHA server-side
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaResult.success) {
        toast.error("Verificación fallida", {
          description: recaptchaResult.error || "Por favor, intente de nuevo.",
        });
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }

      // Sanitize the feature title to prevent injection
      const sanitizedFeatureTitle = sanitizeText(feature.title);

      const { error } = await supabase
        .from('contactos_formulario')
        .insert({
          nombre: validation.data.name,
          apellido: '',
          email: validation.data.email,
          telefono: validation.data.phone || null,
          mensaje: `Interesado en: ${sanitizedFeatureTitle}\n\n${validation.data.message}`,
          Presupuesto: null,
          pagina_origen: window.location.href,
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || null,
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || null,
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || null
        });

      if (error) throw error;

      toast.success("Solicitud enviada con éxito", {
        description: "Nos pondremos en contacto con usted pronto.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      setShowForm(false);
      onClose();
    } catch (error) {
      console.error('Error saving form');
      toast.error("Error al enviar la solicitud", {
        description: "Por favor, inténtelo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
              <feature.icon className="text-primary-foreground" size={20} />
            </div>
            {feature.title}
          </DialogTitle>
        </DialogHeader>

        {!showForm ? (
          <div className="space-y-6">
            <p className="text-muted-foreground text-lg">
              {feature.description}
            </p>

            {feature.detailedDescription && (
              <div className="bg-gradient-subtle rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Descripción Detallada</h3>
                <p className="text-muted-foreground">{feature.detailedDescription}</p>
              </div>
            )}

            {feature.benefits && feature.benefits.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Beneficios</h3>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">✓</span>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button 
                variant="premium" 
                className="flex-1"
                onClick={() => setShowForm(true)}
              >
                Rellenar Formulario
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {validationErrors.length > 0 && (
              <div className="text-sm text-destructive">
                {validationErrors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <ReCaptchaComponent
              ref={recaptchaRef}
              onChange={handleRecaptchaChange}
              className="my-4"
            />

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                variant="premium" 
                className="flex-1"
                disabled={isSubmitting || !recaptchaToken}
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                Volver
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AIFeatureModal;
