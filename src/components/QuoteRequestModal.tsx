import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { validateContactForm } from "@/utils/contactFormValidation";
import ReCaptcha, { ReCaptchaRef } from "@/components/ReCaptcha";
import { verifyRecaptcha } from "@/utils/recaptchaVerification";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
}

const QuoteRequestModal = ({ isOpen, onClose, serviceTitle }: QuoteRequestModalProps) => {
  const { language } = useLanguage();
  const tr = (es: string, ca: string) => (language === "ca" ? ca : es);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const messageWithService = serviceTitle 
      ? `${tr("Servicio", "Servei")}: ${serviceTitle}\n\n${formData.message}`
      : formData.message;

    if (!recaptchaToken) {
      toast.error(tr("Verificación requerida", "Verificació requerida"), {
        description: tr("Por favor, completa el CAPTCHA para continuar.", "Si us plau, completa el CAPTCHA per continuar."),
      });
      setIsSubmitting(false);
      return;
    }

    const captchaVerification = await verifyRecaptcha(recaptchaToken);
    if (!captchaVerification.success) {
      toast.error(tr("Error de verificación", "Error de verificació"), {
        description: captchaVerification.error || tr("La verificación CAPTCHA ha fallado.", "La verificació CAPTCHA ha fallat."),
      });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setIsSubmitting(false);
      return;
    }

    const validation = validateContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      message: messageWithService,
      budget: formData.budget || undefined,
    });

    if (!validation.success) {
      toast.error(tr("Error de validación", "Error de validació"), {
        description: validation.errors[0] || tr("Por favor revise los datos ingresados", "Si us plau, revisa les dades introduïdes"),
      });
      setIsSubmitting(false);
      return;
    }

    const validatedData = validation.data;

    try {
      const { error } = await supabase
        .from('contactos_formulario')
        .insert({
          nombre: validatedData.name,
          apellido: '',
          email: validatedData.email,
          telefono: validatedData.phone || null,
          mensaje: validatedData.message,
          Presupuesto: validatedData.budget || null,
          pagina_origen: window.location.href,
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || null,
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || null,
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || null
        });

      if (error) throw error;

      toast.success(tr("Solicitud enviada con éxito", "Sol·licitud enviada amb èxit"), {
        description: tr("Nos pondremos en contacto con usted pronto.", "Ens posarem en contacte amb vostè aviat."),
      });
      setFormData({ name: "", email: "", phone: "", message: "", budget: "" });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      onClose();
    } catch (error) {
      toast.error(tr("Error al enviar la solicitud", "Error en enviar la sol·licitud"), {
        description: tr("Por favor, inténtelo de nuevo o contáctenos directamente.", "Si us plau, torneu-ho a provar o contacteu-nos directament."),
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
            {tr("Solicitar Presupuesto", "Sol·licitar Pressupost")}
          </DialogTitle>
          {serviceTitle && (
            <p className="text-sm text-muted-foreground mt-2">
              {tr("Para", "Per a")}: <span className="font-semibold text-foreground">{serviceTitle}</span>
            </p>
          )}
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">{tr("Nombre Completo", "Nom Complet")}</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2"
              placeholder={tr("Juan Pérez", "Joan Pérez")}
            />
          </div>

          <div>
            <Label htmlFor="email">{tr("Correo Electrónico", "Correu Electrònic")}</Label>
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
            <Label htmlFor="phone">{tr("Teléfono (Opcional)", "Telèfon (Opcional)")}</Label>
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
            <Label htmlFor="budget">{tr("Rango de Presupuesto", "Rang de Pressupost")}</Label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            >
              <option value="">{tr("Seleccionar presupuesto", "Seleccionar pressupost")}</option>
              <option value="menos-2000">{tr("Menos de 2.000€", "Menys de 2.000€")}</option>
              <option value="menos-5000">{tr("Menos de 5.000€", "Menys de 5.000€")}</option>
              <option value="mas-6000">{tr("Más de 6.000€", "Més de 6.000€")}</option>
            </select>
          </div>

          <div>
            <Label htmlFor="message">{tr("Mensaje", "Missatge")}</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-2 min-h-[100px]"
              placeholder={tr("Cuéntenos sobre su proyecto...", "Expliqui'ns el seu projecte...")}
            />
          </div>

          <ReCaptcha 
            ref={recaptchaRef}
            onChange={setRecaptchaToken}
            className="my-2"
          />

          <Button 
            type="submit" 
            variant="premium" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            <Send className="mr-2" size={20} />
            {isSubmitting ? tr("Enviando...", "Enviant...") : tr("Enviar Solicitud", "Enviar Sol·licitud")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
