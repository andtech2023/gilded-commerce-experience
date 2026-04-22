import { useState, useRef } from "react";
import { Upload, CheckCircle2, Shield, TrendingDown, Calculator, Zap, Volume2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppButton from "@/components/WhatsAppButton";
import TelegramButton from "@/components/TelegramButton";
import BenefitAudioModal from "@/components/BenefitAudioModal";
import ReCaptcha, { ReCaptchaRef } from "@/components/ReCaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validateContactForm } from "@/utils/contactFormValidation";
import { verifyRecaptcha } from "@/utils/recaptchaVerification";
import { useLanguage } from "@/contexts/LanguageContext";
import repsolLogo from "@/assets/repsol-logo.png";
import endesaLogo from "@/assets/endesa-logo.png";
import audaxLogo from "@/assets/audax-logo.png";
import aracanLogo from "@/assets/aracan-energia-logo-v2.png";
import nibaLogo from "@/assets/niba-logo.jpg";
import nexusLogo from "@/assets/nexus-energia-logo.png";
import energyBannerBg from "@/assets/energy-banner-bg.jpg";

const AhorroEnergetico = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const tr = (es: string, ca: string) => (language === "ca" ? ca : es);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);

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

    if (!recaptchaToken) {
      toast({
        title: tr("Verificación requerida", "Verificació requerida"),
        description: tr("Por favor, completa el CAPTCHA para continuar.", "Si us plau, completa el CAPTCHA per continuar."),
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const captchaVerification = await verifyRecaptcha(recaptchaToken);
    if (!captchaVerification.success) {
      toast({
        title: tr("Error de verificación", "Error de verificació"),
        description: captchaVerification.error || tr("La verificación CAPTCHA ha fallado.", "La verificació CAPTCHA ha fallat."),
        variant: "destructive",
      });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setIsSubmitting(false);
      return;
    }

    const validation = validateContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message || tr("Solicitud de análisis de ahorro energético", "Sol·licitud d'anàlisi d'estalvi energètic"),
    });

    if (!validation.success) {
      toast({
        title: tr("Error de validación", "Error de validació"),
        description: validation.errors.join(", "),
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("contactos_formulario").insert([
        {
          nombre: validation.data.name,
          email: validation.data.email,
          telefono: validation.data.phone,
          empresa: formData.company,
          mensaje: validation.data.message,
          tipo: "ahorro_energetico",
        },
      ]);

      if (error) throw error;

      toast({
        title: tr("¡Solicitud enviada!", "Sol·licitud enviada!"),
        description: tr(
          "Nos pondremos en contacto contigo pronto para analizar tu factura.",
          "Ens posarem en contacte amb tu aviat per analitzar la teva factura."
        ),
      });

      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setFile(null);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } catch (error) {
      toast({
        title: "Error",
        description: tr("Ha ocurrido un error. Por favor, inténtalo de nuevo.", "Hi ha hagut un error. Si us plau, torna-ho a provar."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleATBotContact = () => {
    const message = encodeURIComponent(
      tr(
        "Hola ATBOT, me gustaría recibir asesoramiento sobre ahorro energético y compartir mi factura de luz para una simulación gratuita.",
        "Hola ATBOT, m'agradaria rebre assessorament sobre estalvi energètic i compartir la meva factura de llum per a una simulació gratuïta."
      )
    );
    window.open(`https://wa.me/376369939?text=${message}`, "_blank");
  };

  const [selectedBenefit, setSelectedBenefit] = useState<typeof benefitsWithAudio[0] | null>(null);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);

  const benefitsWithAudio = [
    {
      icon: <TrendingDown className="w-12 h-12 text-primary" />,
      title: tr("Ahorro Garantizado", "Estalvi Garantit"),
      description: tr(
        "Reducimos tus costes energéticos hasta un 40% encontrando la tarifa perfecta para tu industria.",
        "Reduïm els teus costos energètics fins a un 40% trobant la tarifa perfecta per a la teva indústria."
      ),
      audioPath: "/audio/ahorro-garantizado.mp3",
      subtitles: [
        { start: 0, end: 3, text: tr("Te garantizamos un ahorro real en tu factura energética.", "Et garantim un estalvi real en la teva factura energètica.") },
        { start: 3, end: 6, text: tr("Nuestros expertos analizan tu consumo actual", "Els nostres experts analitzen el teu consum actual") },
        { start: 6, end: 9, text: tr("y comparan todas las ofertas disponibles en el mercado.", "i comparen totes les ofertes disponibles al mercat.") },
        { start: 9, end: 12, text: tr("Encontramos la tarifa perfecta para tu industria,", "Trobem la tarifa perfecta per a la teva indústria,") },
        { start: 12, end: 15, text: tr("con ahorros de hasta un 40% garantizados.", "amb estalvis de fins a un 40% garantits.") },
        { start: 15, end: 18, text: tr("Sin compromisos, solo resultados.", "Sense compromisos, només resultats.") },
      ],
    },
    {
      icon: <Calculator className="w-12 h-12 text-primary" />,
      title: tr("Simulador Avanzado", "Simulador Avançat"),
      description: tr(
        "Nuestra herramienta propia analiza todas las ofertas del mercado en tiempo real.",
        "La nostra eina pròpia analitza totes les ofertes del mercat en temps real."
      ),
      audioPath: "/audio/simulador.mp3",
      subtitles: [
        { start: 0, end: 3, text: tr("Nuestro simulador es una herramienta de diseño propio.", "El nostre simulador és una eina de disseny propi.") },
        { start: 3, end: 6, text: tr("Analiza tu factura y compara en tiempo real", "Analitza la teva factura i compara en temps real") },
        { start: 6, end: 9, text: tr("todas las ofertas energéticas del mercado español.", "totes les ofertes energètiques del mercat espanyol.") },
        { start: 9, end: 12, text: tr("Te mostramos exactamente cuánto puedes ahorrar", "Et mostrem exactament quant pots estalviar") },
        { start: 12, end: 15, text: tr("con cada compañía y tarifa disponible.", "amb cada companyia i tarifa disponible.") },
        { start: 15, end: 18, text: tr("Tecnología avanzada al servicio de tu ahorro.", "Tecnologia avançada al servei del teu estalvi.") },
      ],
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: tr("100% Confidencial", "100% Confidencial"),
      description: tr(
        "Tus datos están protegidos. Análisis profesional sin compromiso y totalmente gratuito.",
        "Les teves dades estan protegides. Anàlisi professional sense compromís i totalment gratuïta."
      ),
      audioPath: "/audio/privacidad.mp3",
      subtitles: [
        { start: 0, end: 3, text: tr("Tu privacidad es nuestra prioridad absoluta.", "La teva privacitat és la nostra prioritat absoluta.") },
        { start: 3, end: 6, text: tr("Todos tus datos están completamente protegidos.", "Totes les teves dades estan completament protegides.") },
        { start: 6, end: 9, text: tr("El análisis es profesional, sin compromiso", "L'anàlisi és professional, sense compromís") },
        { start: 9, end: 12, text: tr("y totalmente gratuito para ti.", "i totalment gratuït per a tu.") },
        { start: 12, end: 15, text: tr("No compartimos tu información con terceros.", "No compartim la teva informació amb tercers.") },
        { start: 15, end: 18, text: tr("Confidencialidad garantizada al 100%.", "Confidencialitat garantida al 100%.") },
      ],
    },
    {
      icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
      title: tr("Gestión Completa", "Gestió Completa"),
      description: tr(
        "Nos encargamos de todo el proceso: análisis, negociación y cambio de proveedor.",
        "Ens encarreguem de tot el procés: anàlisi, negociació i canvi de proveïdor."
      ),
      audioPath: "/audio/tramite.mp3",
      subtitles: [
        { start: 0, end: 3, text: tr("Nosotros nos encargamos de todo el proceso.", "Nosaltres ens encarreguem de tot el procés.") },
        { start: 3, end: 6, text: tr("Desde el análisis inicial de tu factura", "Des de l'anàlisi inicial de la teva factura") },
        { start: 6, end: 9, text: tr("hasta la negociación con las compañías energéticas.", "fins a la negociació amb les companyies energètiques.") },
        { start: 9, end: 12, text: tr("Gestionamos el cambio de proveedor por ti.", "Gestionem el canvi de proveïdor per tu.") },
        { start: 12, end: 15, text: tr("Tú solo te relajas y empiezas a ahorrar.", "Tu només et relaxes i comences a estalviar.") },
        { start: 15, end: 18, text: tr("Gestión completa sin complicaciones.", "Gestió completa sense complicacions.") },
      ],
    },
  ];

  const handleBenefitClick = (benefit: typeof benefitsWithAudio[0]) => {
    setSelectedBenefit(benefit);
    setIsAudioModalOpen(true);
  };

  const companies = [
    { name: "Repsol", logo: repsolLogo },
    { name: "Endesa", logo: endesaLogo },
    { name: "Audax", logo: audaxLogo },
    { name: "Aracan Energía", logo: aracanLogo },
    { name: "Niba", logo: nibaLogo },
    { name: "Nexus Energía", logo: nexusLogo },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={tr("Ahorro Energético Empresarial | Andorra Tech", "Estalvi Energètic Empresarial | Andorra Tech")}
        description={tr(
          "Reduce tu factura eléctrica hasta un 40%. Simulador de tarifas, comparador energético y gestión de cambio de comercializadora para empresas.",
          "Redueix la teva factura elèctrica fins a un 40%. Simulador de tarifes, comparador energètic i gestió de canvi de comercialitzadora per a empreses."
        )}
        canonical="https://www.andorratech.net/ahorro-energetico"
      />
      <Navbar />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {tr("Expertos en Optimización Energética", "Experts en Optimització Energètica")}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gradient-gold">
              {tr("Ahorro Energético Inteligente", "Estalvi Energètic Intel·ligent")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {tr(
                "¿Sabías que podrías estar pagando hasta un 40% más en tu factura eléctrica? En AndorraTech te ayudamos a encontrar la mejor tarifa del mercado para tu industria.",
                "Sabies que podries estar pagant fins a un 40% més en la teva factura elèctrica? A AndorraTech t'ajudem a trobar la millor tarifa del mercat per a la teva indústria."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Why Specialist Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              {tr("¿Por qué necesitas un Agente Especialista en Energía?", "Per què necessites un Agent Especialista en Energia?")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {tr(
                "El mercado energético es complejo y cambiante. Las tarifas varían constantemente y cada industria tiene necesidades específicas. Un agente especialista te garantiza:",
                "El mercat energètic és complex i canviant. Les tarifes varien constantment i cada indústria té necessitats específiques. Un agent especialista et garanteix:"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitsWithAudio.map((benefit, index) => (
              <button
                key={index}
                onClick={() => handleBenefitClick(benefit)}
                className="p-6 rounded-lg bg-background border border-border hover:border-primary transition-all duration-300 hover:shadow-elegant animate-fade-in text-left group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  {benefit.icon}
                  <Volume2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
                <span className="text-xs text-primary mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                  🔊 {tr("Haz clic para escuchar", "Fes clic per escoltar")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Banner */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${energyBannerBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gradient-gold">
              {tr("Distribuidores Oficiales", "Distribuïdors Oficials")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {tr(
                "Trabajamos con las principales compañías energéticas de España",
                "Treballem amb les principals companyies energètiques d'Espanya"
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {companies.map((company, index) => (
              <div
                key={index}
                className="group aspect-[4/3] bg-white rounded-2xl shadow-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] transition-all duration-500 flex items-center justify-center p-6 animate-fade-in border border-primary/15 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={company.logo}
                  alt={tr(`Logo de ${company.name} - Distribuidor energético oficial`, `Logotip de ${company.name} - Distribuïdor energètic oficial`)}
                  className="max-w-[80%] max-h-[70%] object-contain transition-transform duration-500 group-hover:scale-[1.6]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/40 shadow-elegant backdrop-blur-sm">
              <CheckCircle2 className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-base font-semibold text-foreground">
                {tr(
                  "Como distribuidores oficiales, nos encargamos de toda la gestión",
                  "Com a distribuïdors oficials, ens encarreguem de tota la gestió"
                )}
              </span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
            25% { transform: translateY(-10px) rotateX(5deg) rotateY(-5deg); }
            50% { transform: translateY(-15px) rotateX(0deg) rotateY(5deg); }
            75% { transform: translateY(-10px) rotateX(-5deg) rotateY(-5deg); }
          }
        `}</style>
      </section>

      {/* Simulator Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              {tr("Nuestra Herramienta de Simulación", "La Nostra Eina de Simulació")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {tr(
                "Utilizamos un simulador de diseño propio que analiza tu consumo actual y compara todas las tarifas disponibles en tiempo real para encontrar la opción más rentable para tu negocio.",
                "Utilitzem un simulador de disseny propi que analitza el teu consum actual i compara totes les tarifes disponibles en temps real per trobar l'opció més rendible per al teu negoci."
              )}
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 border border-primary/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">{tr("1. Analiza", "1. Analitza")}</h3>
                <p className="text-sm text-muted-foreground">
                  {tr("Sube tu factura y analizamos tu consumo", "Puja la teva factura i analitzem el teu consum")}
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Calculator className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">{tr("2. Compara", "2. Compara")}</h3>
                <p className="text-sm text-muted-foreground">
                  {tr("Nuestro simulador busca la mejor opción", "El nostre simulador busca la millor opció")}
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto shadow-md">
                  <TrendingDown className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">{tr("3. Ahorra", "3. Estalvia")}</h3>
                <p className="text-sm text-muted-foreground">
                  {tr("Te mostramos tu potencial de ahorro", "Et mostrem el teu potencial d'estalvi")}
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
              {tr("Solicita tu Análisis Gratuito", "Sol·licita la teva Anàlisi Gratuïta")}
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              {tr(
                "Sube tu factura de luz y te contactaremos con un estudio personalizado",
                "Puja la teva factura de llum i et contactarem amb un estudi personalitzat"
              )}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {tr("100% Confidencial • Sin Coste • Sin Compromiso", "100% Confidencial • Sense Cost • Sense Compromís")}
              </span>
            </div>
          </div>

          <div className="bg-background rounded-xl shadow-elegant border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{tr("Nombre completo *", "Nom complet *")}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={tr("Tu nombre", "El teu nom")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">{tr("Empresa", "Empresa")}</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={tr("Nombre de tu empresa", "Nom de la teva empresa")}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">{tr("Email *", "Correu *")}</Label>
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
                  <Label htmlFor="phone">{tr("Teléfono *", "Telèfon *")}</Label>
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
                <Label htmlFor="message">{tr("Mensaje adicional", "Missatge addicional")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={tr("Cuéntanos sobre tu consumo energético actual...", "Explica'ns sobre el teu consum energètic actual...")}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">{tr("Subir factura de luz (opcional)", "Pujar factura de llum (opcional)")}</Label>
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
                  {tr("Formatos aceptados: PDF, JPG, PNG (máx. 10MB)", "Formats acceptats: PDF, JPG, PNG (màx. 10MB)")}
                </p>
              </div>

              <ReCaptcha 
                ref={recaptchaRef}
                onChange={setRecaptchaToken}
                className="my-4"
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  variant="premium"
                  size="lg"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? tr("Enviando...", "Enviant...") : tr("Solicitar Análisis Gratuito", "Sol·licitar Anàlisi Gratuïta")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleATBotContact}
                  className="flex-1 group hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
                >
                  <span>{tr("Hablar con ATBOT", "Parlar amb ATBOT")}</span>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                {tr(
                  "También puedes contactar directamente con ATBOT por WhatsApp para compartir tu factura y recibir asesoramiento personalizado inmediato.",
                  "També pots contactar directament amb ATBOT per WhatsApp per compartir la teva factura i rebre assessorament personalitzat immediat."
                )}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
            {tr("¿Por qué elegir AndorraTech?", "Per què escollir AndorraTech?")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-4xl font-bold text-primary">+10</div>
              <p className="text-muted-foreground">{tr("Años de experiencia", "Anys d'experiència")}</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-primary">40%</div>
              <p className="text-muted-foreground">{tr("Ahorro promedio", "Estalvi mitjà")}</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <p className="text-muted-foreground">{tr("Soporte disponible", "Suport disponible")}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <TelegramButton />
      
      <BenefitAudioModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        benefit={selectedBenefit}
      />
    </div>
  );
};

export default AhorroEnergetico;
