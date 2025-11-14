import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Info, ShoppingCart, Zap } from "lucide-react";
import web1 from "@/assets/webdev-slider-1.jpg";
import web2 from "@/assets/webdev-slider-2.jpg";
import web3 from "@/assets/webdev-slider-3.jpg";
import WebPackageDetailModal from "./WebPackageDetailModal";
import PaymentModal from "./PaymentModal";
import { Button } from "./ui/button";

const slides = [
  {
    name: "Básico",
    title: "Desarrollo Web – Básico",
    description: "Presencia online profesional ideal para pequeños negocios y startups.",
    perks: ["Hasta 5 páginas", "Responsive", "SEO básico", "Formulario de contacto", "Hosting 1 año"],
    features: [
      "Hasta 5 páginas optimizadas",
      "Diseño responsive adaptado a todos los dispositivos",
      "SEO básico para mejorar visibilidad",
      "Formulario de contacto funcional",
      "Hosting gratuito durante 1 año",
      "Soporte técnico durante 3 meses"
    ],
    price: "750€",
    deliveryTime: "48h",
    image: web1,
  },
  {
    name: "Profesional",
    title: "Desarrollo Web – Profesional",
    description: "Solución completa para empresas en crecimiento que necesitan funcionalidades avanzadas.",
    perks: ["Hasta 10 páginas", "Pasarela de pago", "Panel admin", "SEO avanzado", "Analytics"],
    features: [
      "Hasta 10 páginas personalizadas",
      "Integración de pasarela de pago segura",
      "Panel de administración intuitivo",
      "SEO avanzado con keywords estratégicas",
      "Google Analytics y métricas avanzadas",
      "Blog integrado",
      "Optimización de velocidad",
      "Soporte técnico durante 6 meses"
    ],
    price: "1.500€",
    deliveryTime: "3-4 semanas",
    image: web2,
  },
  {
    name: "Premium",
    title: "Desarrollo Web – Premium",
    description: "La solución más completa con todas las funcionalidades empresariales y soporte prioritario.",
    perks: ["Páginas ilimitadas", "E‑commerce", "Integraciones API", "IA integrada", "Soporte 24/7"],
    features: [
      "Páginas ilimitadas",
      "E-commerce completo con gestión de inventario",
      "Integraciones API personalizadas",
      "Sistema de IA integrado para chat o recomendaciones",
      "Multiidioma con traducciones",
      "Base de datos optimizada",
      "Sistema de usuarios y roles",
      "Backup automático diario",
      "Soporte prioritario 24/7 durante 12 meses",
      "Actualizaciones y mantenimiento incluido"
    ],
    price: "2.500€",
    deliveryTime: "4-6 semanas",
    image: web3,
  },
];

const WebDevelopmentSlider = () => {
  const [current, setCurrent] = useState(0);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(slides[0]);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const handleDetails = () => {
    setSelectedService(slides[current]);
    setDetailModalOpen(true);
  };

  const handlePurchase = () => {
    setDetailModalOpen(false);
    setPaymentModalOpen(true);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border">
      {/* Heading */}
      <header className="absolute z-20 top-4 left-4 flex items-center gap-2 text-white drop-shadow">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg md:text-xl font-semibold tracking-wide">Desarrollo WEB</h3>
      </header>

      {/* 48h Badge - Only for Básico package */}
      {slides[current].name === "Básico" && (
        <div className="absolute z-20 top-14 right-2 sm:top-4 sm:right-4 animate-pulse">
          <div className="relative bg-gradient-to-r from-primary via-primary-variant to-primary rounded-lg sm:rounded-xl px-2 py-1 sm:px-4 sm:py-2 shadow-glow border border-primary-glow sm:border-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <Zap className="w-3 h-3 sm:w-5 sm:h-5 text-white animate-bounce" />
              <span className="text-white font-bold text-xs sm:text-lg tracking-wide whitespace-nowrap">¡ENTREGA EN 48H!</span>
              <Zap className="w-3 h-3 sm:w-5 sm:h-5 text-white animate-bounce" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
      )}

      {/* Slides */}
      <div className="relative h-[420px]">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ${i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          >
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-background/30" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-foreground animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h4 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-gold bg-clip-text text-transparent">{s.title}</h4>
                    <span className="text-2xl md:text-3xl font-bold text-primary">{s.price}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">{s.description}</p>
                </div>
              </div>

              <ul className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-sm text-muted-foreground">
                {s.perks.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-card/50 border border-border rounded-lg px-3 py-2 hover-scale">
                    <span className="text-primary">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3 flex-wrap">
                <Button
                  onClick={handleDetails}
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Ver detalles
                </Button>
                <Button
                  onClick={() => {
                    setSelectedService(slides[current]);
                    setPaymentModalOpen(true);
                  }}
                  variant="premium"
                  className="bg-gradient-to-r from-primary to-primary-variant hover:opacity-90"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Comprar Ahora
                </Button>
              </div>
            </div>

            {/* Futuristic corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/40" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/40" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/40" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/40" />
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button onClick={prev} aria-label="Anterior" className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-primary/20 backdrop-blur text-white p-2 rounded-full hover:bg-primary/40 transition-opacity"> 
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} aria-label="Siguiente" className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-primary/20 backdrop-blur text-white p-2 rounded-full hover:bg-primary/40 transition-opacity"> 
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Ir al slide ${i+1}`} className={`rounded-full transition-all ${i===current ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/50 hover:bg-white/70'}`} />
        ))}
      </div>

      {/* Modals */}
      <WebPackageDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        package={selectedService}
        onPurchase={handlePurchase}
      />
      
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        service={`Desarrollo Web ${selectedService.name}`}
        price={selectedService.price}
      />
    </div>
  );
};

export default WebDevelopmentSlider;
