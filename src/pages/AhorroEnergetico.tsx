import { useState } from "react";
import { Upload, CheckCircle2, Shield, TrendingDown, Calculator, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TelegramButton from "@/components/TelegramButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import repsolLogo from "@/assets/repsol-logo.png";
import endesaLogo from "@/assets/endesa-logo.png";
import audaxLogo from "@/assets/audax-logo.png";
import nexusLogo from "@/assets/nexus-logo.png";

const AhorroEnergetico = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contactos_formulario").insert([
        {
          nombre: formData.name,
          email: formData.email,
          telefono: formData.phone,
          empresa: formData.company,
          mensaje: formData.message,
          tipo: "ahorro_energetico",
        },
      ]);

      if (error) throw error;

      toast({
        title: "¡Solicitud enviada!",
        description: "Nos pondremos en contacto contigo pronto para analizar tu factura.",
      });

      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleATBotContact = () => {
    const message = encodeURIComponent(
      "Hola ATBOT, me gustaría recibir asesoramiento sobre ahorro energético y compartir mi factura de luz para una simulación gratuita."
    );
    window.open(`https://wa.me/376369939?text=${message}`, "_blank");
  };

  const benefits = [
    {
      icon: <TrendingDown className="w-12 h-12 text-primary" />,
      title: "Ahorro Garantizado",
      description: "Reducimos tus costes energéticos hasta un 40% encontrando la tarifa perfecta para tu industria.",
    },
    {
      icon: <Calculator className="w-12 h-12 text-primary" />,
      title: "Simulador Avanzado",
      description: "Nuestra herramienta propia analiza todas las ofertas del mercado en tiempo real.",
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "100% Confidencial",
      description: "Tus datos están protegidos. Análisis profesional sin compromiso y totalmente gratuito.",
    },
    {
      icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
      title: "Gestión Completa",
      description: "Nos encargamos de todo el proceso: análisis, negociación y cambio de proveedor.",
    },
  ];

  const companies = [
    { name: "Repsol", logo: repsolLogo },
    { name: "Endesa", logo: endesaLogo },
    { name: "Audax", logo: audaxLogo },
    { name: "Nexus", logo: nexusLogo },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Expertos en Optimización Energética</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gradient-gold">
              Ahorro Energético Inteligente
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ¿Sabías que podrías estar pagando hasta un 40% más en tu factura eléctrica?
              En AndorraTech te ayudamos a encontrar la mejor tarifa del mercado para tu industria.
            </p>
          </div>
        </div>
      </section>

      {/* Why Specialist Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              ¿Por qué necesitas un Agente Especialista en Energía?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              El mercado energético es complejo y cambiante. Las tarifas varían constantemente y cada industria
              tiene necesidades específicas. Un agente especialista te garantiza:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-background border border-border hover:border-primary transition-all duration-300 hover:shadow-elegant animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Banner */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Distribuidores Oficiales
            </h2>
            <p className="text-lg text-muted-foreground">
              Trabajamos con las principales compañías energéticas de España
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {companies.map((company, index) => (
              <div
                key={index}
                className="w-full max-w-[200px] h-32 bg-background rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={company.logo}
                  alt={`Logo ${company.name}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background border border-primary/30 shadow-elegant">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">
                Como distribuidores oficiales, nos encargamos de toda la gestión
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Nuestra Herramienta de Simulación
            </h2>
            <p className="text-lg text-muted-foreground">
              Utilizamos un simulador de diseño propio que analiza tu consumo actual y compara
              todas las tarifas disponibles en tiempo real para encontrar la opción más rentable
              para tu negocio.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 border border-primary/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">1. Analiza</h3>
                <p className="text-sm text-muted-foreground">
                  Sube tu factura y analizamos tu consumo
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Calculator className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">2. Compara</h3>
                <p className="text-sm text-muted-foreground">
                  Nuestro simulador busca la mejor opción
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto shadow-md">
                  <TrendingDown className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">3. Ahorra</h3>
                <p className="text-sm text-muted-foreground">
                  Te mostramos tu potencial de ahorro
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Solicita tu Análisis Gratuito
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Sube tu factura de luz y te contactaremos con un estudio personalizado
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                100% Confidencial • Sin Coste • Sin Compromiso
              </span>
            </div>
          </div>

          <div className="bg-background rounded-xl shadow-elegant border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+376 XXX XXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje adicional</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu consumo energético actual..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Subir factura de luz (opcional)</Label>
                <div className="relative">
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="cursor-pointer"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Formatos aceptados: PDF, JPG, PNG (máx. 10MB)
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  variant="premium"
                  size="lg"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Enviando..." : "Solicitar Análisis Gratuito"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleATBotContact}
                  className="flex-1 group hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
                >
                  <span>Hablar con ATBOT</span>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                También puedes contactar directamente con ATBOT por WhatsApp para compartir tu
                factura y recibir asesoramiento personalizado inmediato.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
            ¿Por qué elegir AndorraTech?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-4xl font-bold text-primary">+10</div>
              <p className="text-muted-foreground">Años de experiencia</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-primary">40%</div>
              <p className="text-muted-foreground">Ahorro promedio</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <p className="text-muted-foreground">Soporte disponible</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <TelegramButton />
    </div>
  );
};

export default AhorroEnergetico;
