import { useState, useRef } from "react";
import {
  Zap, Battery, Sun, ShieldCheck, TrendingDown, Cpu, CheckCircle2,
  Building2, ChevronDown, ChevronUp, Upload, Factory, Globe, Euro,
  BarChart3, Leaf, Bolt
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppButton from "@/components/WhatsAppButton";
import TelegramButton from "@/components/TelegramButton";
import ReCaptcha, { ReCaptchaRef } from "@/components/ReCaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validateContactForm } from "@/utils/contactFormValidation";
import { verifyRecaptcha } from "@/utils/recaptchaVerification";

// ── FAQ data ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "¿Cómo reducir la factura eléctrica en una empresa?",
    a: "La forma más efectiva de reducir la factura eléctrica en una empresa es mediante la implantación de sistemas de gestión inteligente de energía. El sistema HBS (Hybrid Battery System) permite cargar baterías cuando el precio de la electricidad es bajo (horas valle) y alimentar la planta desde ellas cuando el precio sube (horas punta). Esto, combinado con autoconsumo fotovoltaico, puede generar ahorros de hasta el 30% en la factura mensual. Además, la optimización de la potencia contratada, la reducción de reactiva y la monitorización continua del consumo son medidas complementarias que potencian el ahorro.",
  },
  {
    q: "¿Qué es un sistema HBS?",
    a: "Un sistema HBS (Hybrid Battery System) es una solución de almacenamiento energético industrial híbrida que combina baterías de alta capacidad con un sistema de gestión inteligente y protección SAI. Su función principal es eliminar los microcortes, estabilizar la tensión de red y optimizar el coste energético. El sistema monitoriza en tiempo real el precio de la energía, carga las baterías en momentos de tarifa reducida y las descarga cuando el precio sube, actuando como un 'buffer' energético inteligente. Es totalmente transparente para la instalación eléctrica existente y no requiere modificaciones mayores.",
  },
  {
    q: "¿Cómo evitar microcortes eléctricos industriales?",
    a: "Los microcortes eléctricos industriales se evitan interponiendo un sistema de almacenamiento con conmutación instantánea entre la red y la instalación. El sistema HBS detecta en menos de 20 milisegundos cualquier anomalía de tensión (caída, pico o corte) y conmuta automáticamente al suministro desde baterías sin que la maquinaria lo perciba. A diferencia de un SAI convencional, el HBS también gestiona la energía de forma activa para reducir costes, convirtiéndose en una solución de protección y ahorro simultánea. Ideal para industria alimentaria, farmacéutica, metal-mecánica y cualquier proceso sensible.",
  },
  {
    q: "¿Cuánto se puede ahorrar con baterías industriales?",
    a: "El ahorro con baterías industriales depende de la potencia contratada, el perfil de consumo y el tipo de tarifa. En instalaciones con tarifa 3.0TD o 6.1TD en España, el diferencial entre horas valle y punta puede superar los 100 €/MWh. Con un sistema HBS correctamente dimensionado, empresas con consumos superiores a 50.000 kWh/mes han logrado ahorros entre un 18% y un 30% en su factura energética. El retorno de la inversión (si no se opta por renting) suele estar entre 3 y 5 años, con una vida útil del sistema superior a 10 años.",
  },
  {
    q: "¿Es rentable el autoconsumo fotovoltaico en industria?",
    a: "Sí, el autoconsumo fotovoltaico industrial es altamente rentable, especialmente en España, Francia y Portugal, donde la radiación solar es superior a la media europea. Para instalaciones industriales con tejados o cubiertas disponibles, la combinación de paneles Tier 1 (Jinko Solar, LONGi, Canadian Solar) con inversores de alta eficiencia y almacenamiento HBS ofrece un ROI típico de 4 a 7 años. El marco regulatorio actual (Real Decreto 244/2019 en España, loi énergie-climat en Francia) facilita la compensación de excedentes y deducciones fiscales del 100% en el primer año, haciendo la inversión aún más atractiva.",
  },
];

// ── Ventajas ─────────────────────────────────────────────────────────────────
const ventajas = [
  { icon: TrendingDown, label: "Reducción hasta 30% factura luz", color: "text-[hsl(142,76%,46%)]" },
  { icon: Zap, label: "Eliminación total de microcortes", color: "text-[hsl(210,100%,60%)]" },
  { icon: ShieldCheck, label: "Protección electrónica industrial", color: "text-[hsl(210,100%,60%)]" },
  { icon: Euro, label: "Renting tecnológico 0€ inversión inicial", color: "text-[hsl(142,76%,46%)]" },
  { icon: BarChart3, label: "100% deducible fiscalmente", color: "text-[hsl(38,70%,48%)]" },
  { icon: Leaf, label: "Retorno cubierto con el ahorro generado", color: "text-[hsl(142,76%,46%)]" },
];

// ── Component ────────────────────────────────────────────────────────────────
const SolucionesEmpresas = () => {
  const { toast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);
  const [formData, setFormData] = useState({
    empresa: "",
    cif: "",
    contacto: "",
    email: "",
    telefono: "",
    potencia: "",
    facturaMensual: "",
    mensaje: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!recaptchaToken) {
      toast({ title: "Verificación requerida", description: "Por favor, completa el CAPTCHA.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const captchaResult = await verifyRecaptcha(recaptchaToken);
    if (!captchaResult.success) {
      toast({ title: "CAPTCHA inválido", description: "Inténtalo de nuevo.", variant: "destructive" });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setIsSubmitting(false);
      return;
    }

    const validation = validateContactForm({
      name: `${formData.contacto} (${formData.empresa})`,
      email: formData.email,
      phone: formData.telefono,
      message: `Empresa: ${formData.empresa} | CIF: ${formData.cif} | Potencia: ${formData.potencia} kW | Factura mensual: ${formData.facturaMensual}€ | ${formData.mensaje}`,
      budget: formData.facturaMensual,
    });

    if (!validation.success) {
      toast({ title: "Error de validación", description: validation.errors.join(", "), variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("contactos_formulario").insert({
        nombre: validation.data.name,
        email: validation.data.email,
        telefono: validation.data.phone || null,
        mensaje: validation.data.message,
        Presupuesto: validation.data.budget || null,
        pagina_origen: "/soluciones-empresas-ahorro-energetico",
        tipo: "soluciones-empresas",
        estado: "nuevo",
      });

      if (error) throw error;

      toast({
        title: "¡Solicitud enviada!",
        description: "Un ingeniero especializado contactará contigo en 24-48h.",
      });

      setFormData({ empresa: "", cif: "", contacto: "", email: "", telefono: "", potencia: "", facturaMensual: "", mensaje: "" });
      setFile(null);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } catch {
      toast({ title: "Error al enviar", description: "Inténtalo de nuevo o contáctanos por WhatsApp.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Ahorro Energético para Empresas | Sistema HBS y Autoconsumo Industrial"
        description="Reduce hasta un 30% tu factura eléctrica y elimina microcortes industriales con nuestro sistema HBS y almacenamiento inteligente. Estudio gratuito."
        canonical="https://www.andorratech.net/soluciones-empresas-ahorro-energetico"
      />

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, hsl(220,13%,6%) 0%, hsl(215,40%,10%) 40%, hsl(220,13%,8%) 100%)",
        }}
        aria-label="Soluciones energéticas para empresas"
      >
        {/* Animated grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(hsl(210,100%,60%,0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(210,100%,60%,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glowing orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(210,100%,60%), transparent)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(142,76%,46%), transparent)" }}
        />

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-16 text-center">
          <Breadcrumbs />

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-8 mt-4"
            style={{
              borderColor: "hsl(210,100%,60%,0.4)",
              background: "hsl(210,100%,60%,0.1)",
              color: "hsl(210,100%,70%)",
            }}
          >
            <Bolt className="w-4 h-4" />
            España · Francia · Portugal
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 max-w-5xl mx-auto"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span style={{ color: "hsl(210,100%,70%)" }}>Soluciones Energéticas</span>{" "}
            <span className="text-foreground">para Empresas</span>
            <br />
            <span style={{ color: "hsl(142,76%,50%)" }}>Reduce hasta un 30%</span>{" "}
            <span className="text-foreground text-2xl md:text-4xl">tu Factura de Luz y Elimina los Microcortes</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Optimización energética avanzada mediante sistemas HBS híbridos, almacenamiento inteligente
            y autoconsumo fotovoltaico industrial. Sin inversión inicial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#formulario-empresa">
              <Button
                size="lg"
                className="text-base px-8 py-4 font-bold rounded-xl"
                style={{
                  background: "linear-gradient(135deg, hsl(210,100%,55%), hsl(210,100%,45%))",
                  color: "white",
                  boxShadow: "0 0 30px hsl(210,100%,55%,0.4)",
                }}
              >
                <Zap className="w-5 h-5 mr-2" />
                Solicitar Estudio Energético Gratuito
              </Button>
            </a>
            <a href="#sistema-hbs">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-4 font-bold rounded-xl border-2"
                style={{ borderColor: "hsl(142,76%,46%)", color: "hsl(142,76%,50%)" }}
              >
                <Battery className="w-5 h-5 mr-2" />
                Auditoría Técnica sin Compromiso
              </Button>
            </a>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { value: "30%", label: "Ahorro en factura" },
              { value: "20ms", label: "Conmutación HBS" },
              { value: "0€", label: "Inversión inicial" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-black mb-1"
                  style={{ color: "hsl(210,100%,65%)", fontFamily: "Orbitron, sans-serif" }}
                >
                  {value}
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ──────────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "hsl(220,13%,7%)" }}
        aria-label="Costes de los microcortes eléctricos"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <h2
            className="text-2xl md:text-4xl font-black text-center mb-6"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            ¿Cuánto le cuesta a tu empresa{" "}
            <span style={{ color: "hsl(0,80%,60%)" }}>un segundo de inactividad?</span>
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
            Los microcortes eléctricos generan pérdidas invisibles pero constantes que erosionan
            la competitividad de cualquier empresa industrial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Factory, title: "Paradas de producción", desc: "Cada microcorte puede detener una línea completa, generando retrasos y penalizaciones de entrega." },
              { icon: Cpu, title: "Daños en maquinaria sensible", desc: "CNC, robots industriales y equipos de precisión sufren averías prematuras por inestabilidad de tensión." },
              { icon: Battery, title: "Pérdida de datos críticos", desc: "Sistemas MES, ERP y bases de datos quedan expuestos a corrupciones y pérdidas irreversibles." },
              { icon: Euro, title: "Penalizaciones contractuales", desc: "Retrasos causados por paradas energéticas generan penalizaciones y pérdida de clientes." },
              { icon: TrendingDown, title: "Sobrecostes en horas punta", desc: "Sin gestión inteligente, la empresa paga el precio máximo de la energía en los momentos de mayor consumo." },
              { icon: Globe, title: "Pérdida de competitividad", desc: "En mercados como España, Francia y Portugal, la inestabilidad energética resta capacidad productiva." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl border"
                style={{
                  background: "hsl(220,13%,10%)",
                  borderColor: "hsl(0,60%,40%,0.3)",
                }}
              >
                <Icon className="w-8 h-8 mb-3" style={{ color: "hsl(0,80%,60%)" }} />
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1rem" }}
                >
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SISTEMA HBS ───────────────────────────────────────────────────── */}
      <section
        id="sistema-hbs"
        className="py-24"
        style={{ background: "hsl(220,13%,9%)" }}
        aria-label="Sistema HBS Hybrid Battery System"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-6"
              style={{
                borderColor: "hsl(210,100%,60%,0.4)",
                background: "hsl(210,100%,60%,0.08)",
                color: "hsl(210,100%,70%)",
              }}
            >
              <Battery className="w-4 h-4" /> Tecnología HBS · Greenvolt Next
            </div>
            <h2
              className="text-2xl md:text-4xl font-black mb-4"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Sistema HBS:{" "}
              <span style={{ color: "hsl(210,100%,65%)" }}>
                Revolución en Estabilidad y Ahorro Energético Empresarial
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              El sistema HBS (Hybrid Battery System) es una solución híbrida avanzada que integra
              almacenamiento, gestión inteligente y protección industrial en un único equipo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Componentes */}
            <div>
              <h3
                className="text-xl font-bold mb-6"
                style={{ fontFamily: "Orbitron, sans-serif", color: "hsl(210,100%,65%)" }}
              >
                Componentes integrados
              </h3>
              <ul className="space-y-4">
                {[
                  "Baterías de alta capacidad (LiFePO4 ciclo largo)",
                  "Protección SAI industrial con conmutación ≤20ms",
                  "Gestión inteligente de carga por precio horario",
                  "Eliminación del 'paso por cero' en conmutación",
                  "Aislamiento automático ante inestabilidad de red",
                  "Monitorización remota 24/7 con telemetría",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "hsl(210,100%,60%)" }} />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Flujo energético */}
            <div className="space-y-4">
              <h3
                className="text-xl font-bold mb-6"
                style={{ fontFamily: "Orbitron, sans-serif", color: "hsl(142,76%,50%)" }}
              >
                Cómo funciona el ahorro
              </h3>
              {[
                {
                  condition: "⚡ Precio energía BAJO (horas valle)",
                  action: "El sistema carga baterías desde la red al coste mínimo.",
                  color: "hsl(210,100%,55%)",
                },
                {
                  condition: "📈 Precio energía ALTO (horas punta)",
                  action: "La planta se alimenta desde baterías. La red queda aislada.",
                  color: "hsl(38,70%,50%)",
                },
                {
                  condition: "⚠️ Microcorte detectado",
                  action: "Conmutación en <20ms. La maquinaria no lo percibe.",
                  color: "hsl(142,76%,46%)",
                },
              ].map(({ condition, action, color }) => (
                <div
                  key={condition}
                  className="p-5 rounded-xl border-l-4"
                  style={{
                    background: "hsl(220,13%,12%)",
                    borderLeftColor: color,
                  }}
                >
                  <div className="font-bold mb-1" style={{ color }}>
                    {condition}
                  </div>
                  <div className="text-muted-foreground text-sm">{action}</div>
                </div>
              ))}

              {/* Resultados */}
              <div
                className="p-6 rounded-xl mt-4"
                style={{
                  background: "linear-gradient(135deg, hsl(210,100%,55%,0.1), hsl(142,76%,46%,0.1))",
                  border: "1px solid hsl(210,100%,55%,0.3)",
                }}
              >
                <div className="text-sm font-bold mb-3" style={{ color: "hsl(210,100%,70%)" }}>
                  RESULTADOS GARANTIZADOS
                </div>
                {[
                  "Reducción de factura eléctrica hasta un 30%",
                  "Eliminación total de microcortes",
                  "Protección de maquinaria crítica",
                  "Estabilidad total de red interna",
                ].map((r) => (
                  <div key={r} className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: "hsl(142,76%,46%)" }} />
                    <span className="text-sm text-foreground/80">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOTOVOLTAICO ──────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "hsl(220,13%,7%)" }}
        aria-label="Autoconsumo fotovoltaico industrial"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-6"
                style={{
                  borderColor: "hsl(38,80%,50%,0.4)",
                  background: "hsl(38,80%,50%,0.08)",
                  color: "hsl(38,80%,60%)",
                }}
              >
                <Sun className="w-4 h-4" /> Paneles Tier 1 · Inversores Premium
              </div>
              <h2
                className="text-2xl md:text-3xl font-black mb-4"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Autoconsumo Fotovoltaico Industrial{" "}
                <span style={{ color: "hsl(38,80%,55%)" }}>Integrado con HBS</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Para empresas con espacio disponible (cubierta industrial, parking, suelo), la combinación
                de generación solar con el sistema HBS convierte la planta en un entorno energéticamente
                inteligente y autosuficiente.
              </p>
              <ul className="space-y-3">
                {[
                  "Paneles Tier 1: Jinko Solar, LONGi, Canadian Solar",
                  "Inversores alta eficiencia: Huawei, SMA, Riello",
                  "Almacenamiento de excedentes en baterías HBS",
                  "Optimización automática del consumo en horas punta",
                  "Reducción de dependencia de la red eléctrica",
                  "Monitorización en tiempo real con app dedicada",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Sun className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(38,80%,55%)" }} />
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual card */}
            <div
              className="p-8 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, hsl(220,13%,12%), hsl(220,13%,15%))",
                border: "1px solid hsl(38,80%,50%,0.25)",
                boxShadow: "0 0 60px hsl(38,80%,50%,0.1)",
              }}
            >
              <h3
                className="text-xl font-bold mb-6 text-center"
                style={{ fontFamily: "Orbitron, sans-serif", color: "hsl(38,80%,60%)" }}
              >
                Sistema Integrado Solar + HBS
              </h3>
              {[
                { from: "☀️ Paneles Fotovoltaicos", to: "Generación propia 0€/kWh" },
                { from: "🔋 Baterías HBS", to: "Almacenamiento excedentes" },
                { from: "🏭 Planta Industrial", to: "Consumo optimizado 24/7" },
                { from: "🌐 Red Eléctrica", to: "Solo en casos necesarios" },
              ].map(({ from, to }) => (
                <div
                  key={from}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                  style={{ borderColor: "hsl(38,80%,50%,0.15)" }}
                >
                  <span className="text-sm font-medium">{from}</span>
                  <span className="text-sm" style={{ color: "hsl(38,80%,60%)" }}>
                    {to}
                  </span>
                </div>
              ))}
              <div
                className="mt-6 p-4 rounded-xl text-center"
                style={{ background: "hsl(38,80%,50%,0.1)", border: "1px solid hsl(38,80%,50%,0.2)" }}
              >
                <div className="text-3xl font-black" style={{ color: "hsl(38,80%,60%)", fontFamily: "Orbitron, sans-serif" }}>
                  ROI 4-7 años
                </div>
                <div className="text-sm text-muted-foreground mt-1">Vida útil sistema: +10 años</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VENTAJAS ──────────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "hsl(220,13%,9%)" }}
        aria-label="Ventajas competitivas sistema HBS"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <h2
            className="text-2xl md:text-4xl font-black text-center mb-4"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Ventajas <span style={{ color: "hsl(142,76%,50%)" }}>Competitivas</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Un sistema diseñado para maximizar el retorno desde el primer mes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ventajas.map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-5 rounded-xl border"
                style={{ background: "hsl(220,13%,12%)", borderColor: "hsl(220,13%,20%)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "hsl(220,13%,15%)" }}
                >
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <span className="font-semibold text-foreground/90">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODELO FINANCIERO ─────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "hsl(215,40%,8%)" }}
        aria-label="Financiación renting tecnológico"
      >
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2
            className="text-2xl md:text-4xl font-black mb-6"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Implementación{" "}
            <span style={{ color: "hsl(142,76%,50%)" }}>sin Inversión Inicial</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Implementamos el sistema HBS mediante <strong className="text-foreground">renting tecnológico 100% deducible</strong>.
            El ahorro mensual generado cubre la cuota del sistema desde el primer mes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Euro, title: "0€ inversión inicial", desc: "Renting tecnológico deducible al 100% en el primer ejercicio fiscal." },
              { icon: TrendingDown, title: "Flujo de caja positivo", desc: "El ahorro energético mensual supera la cuota del sistema desde el inicio." },
              { icon: BarChart3, title: "Mejora competitividad", desc: "Costes energéticos reducidos = mayor margen = más capacidad de inversión." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, hsl(142,76%,36%,0.1), hsl(210,100%,55%,0.05))",
                  border: "1px solid hsl(142,76%,36%,0.25)",
                }}
              >
                <Icon className="w-10 h-10 mx-auto mb-4" style={{ color: "hsl(142,76%,50%)" }} />
                <div
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1rem" }}
                >
                  {title}
                </div>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTORIDAD ─────────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "hsl(220,13%,9%)" }}
        aria-label="Equipo de ingeniería energética"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2
              className="text-2xl md:text-4xl font-black mb-4"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Ingeniería Energética{" "}
              <span style={{ color: "hsl(210,100%,65%)" }}>de Alto Nivel</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Unimos ingeniería propia en Andorra con los líderes mundiales del sector energético
              para ofrecer soluciones de máxima calidad y fiabilidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Tecnología HBS",
                partner: "Greenvolt Next",
                desc: "Socio tecnológico para sistemas de almacenamiento e híbridos industriales de alta eficiencia.",
                icon: Battery,
                color: "hsl(210,100%,60%)",
              },
              {
                title: "Paneles Fotovoltaicos",
                partner: "Tier 1: Jinko · LONGi · Canadian",
                desc: "Los fabricantes de mayor eficiencia y durabilidad del mercado global.",
                icon: Sun,
                color: "hsl(38,80%,55%)",
              },
              {
                title: "Inversores Industriales",
                partner: "Huawei · SMA · Riello",
                desc: "Líderes mundiales en inversores para instalaciones industriales de gran potencia.",
                icon: Cpu,
                color: "hsl(142,76%,46%)",
              },
              {
                title: "Área de Operaciones",
                partner: "España · Francia · Portugal",
                desc: "Equipos de ingeniería y instalación especializados en los tres mercados.",
                icon: Globe,
                color: "hsl(210,100%,60%)",
              },
            ].map(({ title, partner, desc, icon: Icon, color }) => (
              <div
                key={title}
                className="flex gap-4 p-6 rounded-xl border"
                style={{ background: "hsl(220,13%,12%)", borderColor: "hsl(220,13%,20%)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}18` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">{title}</div>
                  <div className="font-bold mb-2" style={{ color }}>
                    {partner}
                  </div>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "hsl(220,13%,7%)" }}
        aria-label="Preguntas frecuentes ahorro energético empresas"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2
            className="text-2xl md:text-4xl font-black text-center mb-4"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Preguntas <span style={{ color: "hsl(210,100%,65%)" }}>Frecuentes</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Todo lo que necesitas saber sobre ahorro energético empresarial.
          </p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: "hsl(220,13%,20%)", background: "hsl(220,13%,11%)" }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left font-semibold hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span style={{ fontFamily: "Rajdhani, sans-serif" }}>{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 shrink-0" style={{ color: "hsl(210,100%,60%)" }} />
                  ) : (
                    <ChevronDown className="w-5 h-5 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {openFaq === i && (
                  <div
                    className="px-5 pb-5 text-muted-foreground leading-relaxed text-sm"
                    style={{ borderTop: "1px solid hsl(220,13%,18%)" }}
                  >
                    <div className="pt-4">{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULARIO ────────────────────────────────────────────────────── */}
      <section
        id="formulario-empresa"
        className="py-24"
        style={{ background: "hsl(215,40%,8%)" }}
        aria-label="Solicitar estudio energético gratuito"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2
              className="text-2xl md:text-4xl font-black mb-4"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Solicitar Estudio Energético{" "}
              <span style={{ color: "hsl(142,76%,50%)" }}>Profesional Gratuito</span>
            </h2>
            <p className="text-muted-foreground">
              Respuesta en 24-48h por ingeniero especializado. Sin compromiso.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl space-y-5"
            style={{
              background: "hsl(220,13%,11%)",
              border: "1px solid hsl(210,100%,55%,0.2)",
              boxShadow: "0 0 60px hsl(210,100%,55%,0.08)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="empresa" className="text-sm font-semibold mb-1 block">
                  Nombre de empresa *
                </Label>
                <Input
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="Empresa S.L."
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="cif" className="text-sm font-semibold mb-1 block">
                  CIF / NIF *
                </Label>
                <Input
                  id="cif"
                  name="cif"
                  value={formData.cif}
                  onChange={handleChange}
                  required
                  maxLength={15}
                  placeholder="B12345678"
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="contacto" className="text-sm font-semibold mb-1 block">
                  Persona de contacto *
                </Label>
                <Input
                  id="contacto"
                  name="contacto"
                  value={formData.contacto}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="Nombre y apellidos"
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-semibold mb-1 block">
                  Email corporativo *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  placeholder="contacto@empresa.com"
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="telefono" className="text-sm font-semibold mb-1 block">
                  Teléfono *
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  maxLength={20}
                  placeholder="+34 600 000 000"
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="potencia" className="text-sm font-semibold mb-1 block">
                  Potencia contratada (kW)
                </Label>
                <Input
                  id="potencia"
                  name="potencia"
                  value={formData.potencia}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder="ej: 150 kW"
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="facturaMensual" className="text-sm font-semibold mb-1 block">
                Factura mensual aproximada (€)
              </Label>
              <Input
                id="facturaMensual"
                name="facturaMensual"
                value={formData.facturaMensual}
                onChange={handleChange}
                maxLength={20}
                placeholder="ej: 5.000 €/mes"
                className="bg-background border-border"
              />
            </div>

            <div>
              <Label htmlFor="mensaje" className="text-sm font-semibold mb-1 block">
                Información adicional
              </Label>
              <Textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                maxLength={1000}
                rows={3}
                placeholder="Tipo de industria, horario de producción, problemática actual..."
                className="bg-background border-border"
              />
            </div>

            {/* File upload */}
            <div>
              <Label className="text-sm font-semibold mb-1 block">Adjuntar última factura eléctrica (opcional)</Label>
              <label
                className="flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed cursor-pointer transition-colors hover:border-primary"
                style={{ borderColor: "hsl(210,100%,55%,0.3)", background: "hsl(220,13%,9%)" }}
              >
                <Upload className="w-6 h-6 mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {file ? file.name : "Haz clic o arrastra tu factura (PDF, máx. 10MB)"}
                </span>
                <input type="file" className="hidden" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
              </label>
            </div>

            <div className="flex justify-center">
              <ReCaptcha ref={recaptchaRef} onChange={(token) => setRecaptchaToken(token)} />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-base font-bold rounded-xl"
              style={{
                background: isSubmitting
                  ? "hsl(220,13%,20%)"
                  : "linear-gradient(135deg, hsl(210,100%,55%), hsl(210,100%,45%))",
                color: "white",
                boxShadow: isSubmitting ? "none" : "0 0 30px hsl(210,100%,55%,0.35)",
              }}
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Solicitar Estudio Energético Profesional Gratuito
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              🔒 Tus datos están protegidos. Respuesta garantizada en 24-48h por ingeniero especializado.
            </p>
          </form>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <TelegramButton />
    </div>
  );
};

export default SolucionesEmpresas;
