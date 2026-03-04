import { useState, useRef, useCallback } from "react";
import {
  Zap, Battery, Sun, ShieldCheck, TrendingDown, Cpu, CheckCircle2,
  ChevronDown, ChevronUp, Upload, Factory, Globe, Euro,
  BarChart3, Leaf, Bolt, Award
} from "lucide-react";
import powerGridImg from "@/assets/power-grid-stability.jpg";
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
import hbsBatteryImg from "@/assets/hbs-battery-real.jpg";
import solarPanelsImg from "@/assets/solar-panels-bright.jpg";
import invertersImg from "@/assets/power-inverters-bright.jpg";
import upsBackupImg from "@/assets/ups-power-protection.jpg";

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

// ── 3D Card hover hook ───────────────────────────────────────────────────────
const use3DCard = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;
    card.style.boxShadow = `${-rotY * 2}px ${rotX * 2}px 40px hsl(38,70%,48%,0.35), 0 20px 60px hsl(0,0%,0%,0.6)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.boxShadow = "0 8px 30px hsl(0,0%,0%,0.4)";
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
};

// ── Photo Card Component ─────────────────────────────────────────────────────
interface PhotoCardProps {
  image: string;
  title: string;
  partner: string;
  desc: string;
  accentColor: string;
  items: string[];
  badge: string;
}

const PhotoCard = ({ image, title, partner, desc, accentColor, items, badge }: PhotoCardProps) => {
  const { ref, handleMouseMove, handleMouseLeave } = use3DCard();

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: "hsl(220,13%,10%)",
        border: `1px solid ${accentColor}40`,
        boxShadow: "0 8px 30px hsl(0,0%,0%,0.4)",
        transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Photo background — bright, minimal overlay */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Very light gradient only at bottom for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, hsl(220,13%,9%,0.75) 100%)`,
          }}
        />
        {/* Colored accent line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
        />
        {/* Badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
          style={{
            background: "hsl(220,13%,8%,0.8)",
            border: `1px solid ${accentColor}70`,
            color: accentColor,
            backdropFilter: "blur(8px)",
          }}
        >
          {badge}
        </div>
        {/* EU Made badge */}
        <div
          className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
          style={{
            background: "hsl(142,76%,36%,0.85)",
            border: "1px solid hsl(142,76%,50%,0.6)",
            color: "hsl(142,76%,85%)",
            backdropFilter: "blur(8px)",
          }}
        >
          🇪🇺 Europa
        </div>
        {/* Title overlay on photo */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs text-white/60 mb-1 uppercase tracking-widest">{title}</div>
          <div className="font-black text-base leading-tight" style={{ fontFamily: "Orbitron, sans-serif", color: accentColor }}>
            {partner}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* EU Quality Banner */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4 text-xs font-semibold"
          style={{
            background: "hsl(142,76%,36%,0.12)",
            border: "1px solid hsl(142,76%,36%,0.3)",
            color: "hsl(142,76%,60%)",
          }}
        >
          <Award className="w-3.5 h-3.5 shrink-0" />
          100% fabricado en Europa · Calidad certificada
        </div>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{desc}</p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accentColor }} />
              <span className="text-foreground/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

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
        style={{ background: "var(--gradient-dark)" }}
        aria-label="Soluciones energéticas para empresas"
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(hsl(38,70%,48%,0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(38,70%,48%,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Gold glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(38,70%,48%), transparent)" }} />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(142,76%,36%), transparent)" }} />

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-16 text-center">
          <Breadcrumbs />

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-8 mt-4"
            style={{
              borderColor: "hsl(38,70%,48%,0.5)",
              background: "hsl(38,70%,48%,0.1)",
              color: "hsl(38,70%,65%)",
            }}
          >
            <Bolt className="w-4 h-4" />
            España · Francia · Portugal
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 max-w-5xl mx-auto"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="text-gradient-gold">Soluciones Energéticas</span>{" "}
            <span className="text-foreground">para Empresas</span>
            <br />
            <span style={{ color: "hsl(142,76%,50%)" }}>Reduce hasta un 30%</span>{" "}
            <span className="text-foreground text-2xl md:text-4xl">tu Factura de Luz y Elimina los Microcortes</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Optimización energética avanzada mediante sistemas HBS híbridos, almacenamiento inteligente
            y autoconsumo fotovoltaico industrial. Sin inversión inicial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#formulario-empresa">
              <Button size="lg" className="text-base px-8 py-4 font-bold rounded-xl delivery-badge-gold border">
                <Zap className="w-5 h-5 mr-2" />
                Solicitar Estudio Energético Gratuito
              </Button>
            </a>
            <a href="#tecnologia">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-4 font-bold rounded-xl border-2 hover:bg-primary hover:text-background hover:border-primary"
                style={{
                  borderColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary))",
                  background: "transparent",
                }}
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
                <div className="text-3xl md:text-4xl font-black mb-1 text-gradient-gold" style={{ fontFamily: "Orbitron, sans-serif" }}>
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
          <h2 className="text-2xl md:text-4xl font-black text-center mb-6" style={{ fontFamily: "Orbitron, sans-serif" }}>
            ¿Cuánto le cuesta a tu empresa{" "}
            <span style={{ color: "hsl(0,80%,60%)" }}>un segundo de inactividad?</span>
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
            Los microcortes eléctricos generan pérdidas invisibles pero constantes que erosionan
            la competitividad de cualquier empresa industrial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                className="p-6 rounded-xl border transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
                style={{
                  background: "hsl(220,13%,11%)",
                  borderColor: "hsl(220,13%,18%)",
                  boxShadow: "0 4px 20px hsl(0,0%,0%,0.3)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "hsl(0,60%,40%,0.15)", border: "1px solid hsl(0,60%,40%,0.3)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "hsl(0,80%,60%)" }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECNOLOGÍA – 3D PHOTO CARDS ──────────────────────────────────── */}
      <section
        id="tecnologia"
        className="py-24"
        style={{ background: "hsl(220,13%,9%)" }}
        aria-label="Tecnología energética industrial"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-4"
              style={{
                borderColor: "hsl(var(--primary),0.4)",
                background: "hsl(var(--primary),0.08)",
                color: "hsl(var(--primary-glow))",
              }}
            >
              <Battery className="w-4 h-4" /> Tecnología HBS · Greenvolt Next
            </div>
            <h2 className="text-2xl md:text-4xl font-black mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Nuestra{" "}
              <span className="text-gradient-gold">Tecnología Industrial</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
              Cuatro pilares tecnológicos que transforman la estabilidad y el coste energético de tu empresa.
              Pasa el cursor sobre cada tarjeta para explorarla.
            </p>
            {/* EU Quality Banner */}
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold mx-auto"
              style={{
                background: "linear-gradient(135deg, hsl(142,76%,36%,0.18), hsl(38,70%,48%,0.18))",
                border: "1px solid hsl(142,76%,50%,0.4)",
                color: "hsl(142,76%,70%)",
              }}
            >
              <Award className="w-5 h-5 shrink-0" style={{ color: "hsl(142,76%,55%)" }} />
              <span>
                🇪🇺 <strong style={{ color: "hsl(45,90%,80%)" }}>100% fabricado en Europa</strong>
                {" "}· Calidad certificada · Ingeniería de primer nivel mundial
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PhotoCard
              image={hbsBatteryImg}
              title="Sistema HBS"
              partner="Hybrid Battery System"
              accentColor="hsl(38,70%,52%)"
              badge="Tecnología Core"
              desc="Almacenamiento LiFePO4 con gestión inteligente que carga en horas valle y descarga en punta."
              items={[
                "Conmutación ≤20ms",
                "Gestión por precio horario",
                "Eliminación microcortes",
                "Monitorización 24/7",
              ]}
            />
            <PhotoCard
              image={solarPanelsImg}
              title="Paneles Fotovoltaicos"
              partner="Tier 1: Jinko · LONGi · Canadian"
              accentColor="hsl(38,90%,58%)"
              badge="Generación Solar"
              desc="Los fabricantes de mayor eficiencia y durabilidad del mercado global con garantía 25 años."
              items={[
                "Eficiencia >22%",
                "Garantía 25 años",
                "Instalación industrial",
                "Autoconsumo integrado",
              ]}
            />
            <PhotoCard
              image={invertersImg}
              title="Inversores Industriales"
              partner="Huawei · SMA · Riello"
              accentColor="hsl(var(--primary))"
              badge="Conversión Premium"
              desc="Líderes mundiales en inversores para instalaciones industriales de gran potencia y alta eficiencia."
              items={[
                "Eficiencia >98.5%",
                "Alta potencia",
                "Gestión remota",
                "Certificación IEC",
              ]}
            />
            <PhotoCard
              image={upsBackupImg}
              title="Respaldo SAI"
              partner="Protección Industrial"
              accentColor="hsl(142,76%,46%)"
              badge="Continuidad"
              desc="Sistema SAI industrial integrado que garantiza continuidad total ante cualquier incidencia de red."
              items={[
                "UPS online doble conversión",
                "Autonomía configurable",
                "Protección sobretensiones",
                "Alarmas en tiempo real",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── SISTEMA HBS DETALLE ───────────────────────────────────────────── */}
      <section
        id="sistema-hbs"
        className="py-24"
        style={{ background: "hsl(220,13%,7%)" }}
        aria-label="Sistema HBS Hybrid Battery System detalle"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: "Orbitron, sans-serif" }}>
                Sistema HBS:{" "}
                <span className="text-gradient-gold">Revolución en Estabilidad y Ahorro</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                El sistema HBS (Hybrid Battery System) es una solución híbrida avanzada que integra
                almacenamiento, gestión inteligente y protección industrial en un único equipo.
              </p>
              <ul className="space-y-3">
                {[
                  "Baterías de alta capacidad (LiFePO4 ciclo largo)",
                  "Protección SAI industrial con conmutación ≤20ms",
                  "Gestión inteligente de carga por precio horario",
                  "Eliminación del 'paso por cero' en conmutación",
                  "Aislamiento automático ante inestabilidad de red",
                  "Monitorización remota 24/7 con telemetría",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "Orbitron, sans-serif", color: "hsl(var(--primary-glow))" }}>
                Cómo funciona el ahorro
              </h3>
              {[
                { condition: "⚡ Precio energía BAJO (horas valle)", action: "El sistema carga baterías desde la red al coste mínimo.", color: "hsl(var(--primary))" },
                { condition: "📈 Precio energía ALTO (horas punta)", action: "La planta se alimenta desde baterías. La red queda aislada.", color: "hsl(38,70%,55%)" },
                { condition: "⚠️ Microcorte detectado", action: "Conmutación en <20ms. La maquinaria no lo percibe.", color: "hsl(142,76%,46%)" },
              ].map(({ condition, action, color }) => (
                <div
                  key={condition}
                  className="p-5 rounded-xl border-l-4"
                  style={{ background: "hsl(220,13%,12%)", borderLeftColor: color }}
                >
                  <div className="font-bold mb-1 text-sm" style={{ color }}>{condition}</div>
                  <div className="text-muted-foreground text-sm">{action}</div>
                </div>
              ))}

              <div
                className="p-6 rounded-xl mt-4"
                style={{
                  background: "hsl(220,13%,12%)",
                  border: "1px solid hsl(var(--primary),0.3)",
                  boxShadow: "0 0 40px hsl(var(--primary),0.08)",
                }}
              >
                <div className="text-sm font-bold mb-3 text-gradient-gold">RESULTADOS GARANTIZADOS</div>
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

      {/* ── VENTAJAS ──────────────────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        aria-label="Ventajas competitivas sistema HBS"
      >
        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src={powerGridImg}
            alt="Red eléctrica industrial y estabilidad energética"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Strong dark overlay to keep text readable */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, hsl(220,13%,6%,0.92) 0%, hsl(220,13%,8%,0.88) 50%, hsl(220,13%,6%,0.93) 100%)",
            }}
          />
          {/* Gold accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--gradient-gold)" }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Ventajas <span className="text-gradient-gold">Competitivas</span>
          </h2>
          <p className="text-center text-muted-foreground mb-3">
            Un sistema diseñado para maximizar el retorno desde el primer mes.
          </p>
          {/* Subtitle about grid stability – thematic link to background */}
          <p className="text-center text-sm mb-12 max-w-2xl mx-auto" style={{ color: "hsl(38,70%,60%)" }}>
            La inestabilidad de red tiene un coste real. El sistema HBS lo elimina permanentemente.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: TrendingDown, label: "Reducción hasta 30% factura luz", color: "hsl(142,76%,50%)" },
              { icon: Zap, label: "Eliminación total de microcortes", color: "hsl(38,70%,55%)" },
              { icon: ShieldCheck, label: "Protección electrónica industrial", color: "hsl(38,80%,60%)" },
              { icon: Euro, label: "Renting tecnológico 0€ inversión inicial", color: "hsl(142,76%,50%)" },
              { icon: BarChart3, label: "100% deducible fiscalmente", color: "hsl(38,70%,55%)" },
              { icon: Leaf, label: "Retorno cubierto con el ahorro generado", color: "hsl(142,76%,50%)" },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "hsl(220,13%,8%,0.85)",
                  borderColor: "hsl(38,70%,48%,0.25)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 24px hsl(0,0%,0%,0.5)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "hsl(220,13%,12%,0.9)", border: `1px solid ${color}55` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <span className="font-semibold" style={{ color: "hsl(45,90%,88%)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODELO FINANCIERO ─────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "hsl(220,13%,7%)" }}
        aria-label="Financiación renting tecnológico"
      >
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-6" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Implementación{" "}
            <span className="text-gradient-gold">sin Inversión Inicial</span>
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
                className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "hsl(220,13%,12%)",
                  border: "1px solid hsl(var(--primary),0.2)",
                  boxShadow: "0 4px 20px hsl(0,0%,0%,0.3)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "hsl(var(--primary),0.12)", border: "1px solid hsl(var(--primary),0.3)" }}
                >
                  <Icon className="w-7 h-7" style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div className="text-lg font-bold mb-2" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.95rem" }}>
                  {title}
                </div>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "hsl(220,13%,9%)" }}
        aria-label="Preguntas frecuentes ahorro energético empresas"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Preguntas <span className="text-gradient-gold">Frecuentes</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Todo lo que necesitas saber sobre ahorro energético empresarial.
          </p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border transition-colors duration-200"
                style={{
                  borderColor: openFaq === i ? "hsl(var(--primary),0.4)" : "hsl(220,13%,18%)",
                  background: "hsl(220,13%,11%)",
                }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left font-semibold hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span style={{ fontFamily: "Rajdhani, sans-serif" }}>{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
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
        style={{ background: "hsl(220,13%,7%)" }}
        aria-label="Solicitar estudio energético gratuito"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-black mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Solicitar Estudio Energético{" "}
              <span className="text-gradient-gold">Profesional Gratuito</span>
            </h2>
          <p className="text-muted-foreground mb-2">
              Respuesta inicial en 24-48h por ingeniero especializado. Sin compromiso.
            </p>
            <p className="text-sm" style={{ color: "hsl(38,70%,60%)" }}>
              📋 Una vez recibidos tus datos, elaboramos el <strong>proyecto de ahorro y presupuesto de inversión en aproximadamente 15 días</strong>.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl space-y-5"
            style={{
              background: "hsl(220,13%,11%)",
              border: "1px solid hsl(var(--primary),0.25)",
              boxShadow: "0 0 60px hsl(var(--primary),0.08)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { id: "empresa", label: "Nombre de empresa *", placeholder: "Empresa S.L.", required: true, maxLength: 100 },
                { id: "cif", label: "CIF / NIF *", placeholder: "B12345678", required: true, maxLength: 15 },
                { id: "contacto", label: "Persona de contacto *", placeholder: "Nombre y apellidos", required: true, maxLength: 100 },
                { id: "email", label: "Email corporativo *", placeholder: "contacto@empresa.com", required: true, maxLength: 255, type: "email" },
                { id: "telefono", label: "Teléfono *", placeholder: "+34 600 000 000", required: true, maxLength: 20, type: "tel" },
                { id: "potencia", label: "Potencia contratada (kW)", placeholder: "ej: 150 kW", maxLength: 20 },
              ].map(({ id, label, placeholder, required, maxLength, type }) => (
                <div key={id}>
                  <Label htmlFor={id} className="text-sm font-semibold mb-1 block">{label}</Label>
                  <Input
                    id={id}
                    name={id}
                    type={type || "text"}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleChange}
                    required={required}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className="bg-background border-border"
                  />
                </div>
              ))}
            </div>

            <div>
              <Label htmlFor="facturaMensual" className="text-sm font-semibold mb-1 block">Factura mensual aproximada (€)</Label>
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
              <Label htmlFor="mensaje" className="text-sm font-semibold mb-1 block">Información adicional</Label>
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

            <div>
              <Label className="text-sm font-semibold mb-1 block">Adjuntar última factura eléctrica (opcional)</Label>
              <label
                className="flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed cursor-pointer transition-colors hover:border-primary"
                style={{ borderColor: "hsl(var(--primary),0.3)", background: "hsl(220,13%,9%)" }}
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
              className="w-full py-4 text-base font-bold rounded-xl delivery-badge-gold border"
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
              🔒 Tus datos están protegidos. Respuesta inicial en 24-48h. Proyecto completo de ahorro + presupuesto de inversión en ~15 días.
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
