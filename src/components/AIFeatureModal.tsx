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
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { language } = useLanguage();
  const tr = (es: string, ca: string) => (language === "ca" ? ca : es);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const recaptchaRef = useRef<ReCaptchaRef>(null);

  const handleRecaptchaChange = (token: string | null) => setRecaptchaToken(token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    const validation = validateContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
    });
    if (!validation.success) {
      setValidationErrors(validation.errors);
      toast.error(tr("Error de validación", "Error de validació"), { description: validation.errors[0] });
      return;
    }
    if (!recaptchaToken) {
      toast.error(tr("Verificación requerida", "Verificació requerida"), {
        description: tr("Por favor, complete el captcha.", "Si us plau, completi el captcha."),
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaResult.success) {
        toast.error(tr("Verificación fallida", "Verificació fallida"), {
          description: recaptchaResult.error || tr("Por favor, intente de nuevo.", "Si us plau, torni a provar."),
        });
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }
      const sanitizedFeatureTitle = sanitizeText(feature.title);
      const { error } = await supabase.from('contactos_formulario').insert({
        nombre: validation.data.name,
        apellido: '',
        email: validation.data.email,
        telefono: validation.data.phone || null,
        mensaje: `${tr("Interesado en", "Interessat en")}: ${sanitizedFeatureTitle}\n\n${validation.data.message}`,
        Presupuesto: null,
        pagina_origen: window.location.href,
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || null,
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || null,
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || null
      });
      if (error) throw error;
      toast.success(tr("Solicitud enviada con éxito", "Sol·licitud enviada amb èxit"), {
        description: tr("Nos pondremos en contacto con usted pronto.", "Ens posarem en contacte amb vostè aviat."),
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      setShowForm(false);
      onClose();
    } catch (error) {
      console.error('Error saving form');
      toast.error(tr("Error al enviar la solicitud", "Error en enviar la sol·licitud"), {
        description: tr("Por favor, inténtelo de nuevo.", "Si us plau, torni a provar."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
            <p className="text-muted-foreground text-lg">{feature.description}</p>

            {feature.detailedDescription && (
              <div className="bg-gradient-subtle rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">{tr("Descripción Detallada", "Descripció Detallada")}</h3>
                <p className="text-muted-foreground">{feature.detailedDescription}</p>
              </div>
            )}

            {feature.benefits && feature.benefits.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3">{tr("Beneficios", "Beneficis")}</h3>
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
              <Button variant="premium" className="flex-1" onClick={() => setShowForm(true)}>
                {tr("Rellenar Formulario", "Omplir Formulari")}
              </Button>
              <Button variant="outline" onClick={onClose}>
                {tr("Cerrar", "Tancar")}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">{tr("Nombre Completo", "Nom Complet")}</Label>
              <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="mt-2" placeholder={tr("Juan Pérez", "Joan Pérez")} />
            </div>
            <div>
              <Label htmlFor="email">{tr("Correo Electrónico", "Correu Electrònic")}</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-2" placeholder="juan@ejemplo.com" />
            </div>
            <div>
              <Label htmlFor="phone">{tr("Teléfono (Opcional)", "Telèfon (Opcional)")}</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="mt-2" placeholder="+376 123 456" />
            </div>
            <div>
              <Label htmlFor="message">{tr("Mensaje", "Missatge")}</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="mt-2 min-h-[100px]" placeholder={tr("Cuéntenos sobre su proyecto...", "Expliqui'ns el seu projecte...")} />
            </div>

            {validationErrors.length > 0 && (
              <div className="text-sm text-destructive">
                {validationErrors.map((error, index) => <p key={index}>{error}</p>)}
              </div>
            )}

            <ReCaptchaComponent ref={recaptchaRef} onChange={handleRecaptchaChange} className="my-4" />

            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="premium" className="flex-1" disabled={isSubmitting || !recaptchaToken}>
                {isSubmitting ? tr("Enviando...", "Enviant...") : tr("Enviar Solicitud", "Enviar Sol·licitud")}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                {tr("Volver", "Tornar")}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AIFeatureModal;
