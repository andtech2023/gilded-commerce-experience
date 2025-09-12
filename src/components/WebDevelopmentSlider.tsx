import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Info, ShoppingCart } from "lucide-react";
import web1 from "@/assets/webdev-slider-1.jpg";
import web2 from "@/assets/webdev-slider-2.jpg";
import web3 from "@/assets/webdev-slider-3.jpg";
import ServiceDetailModal from "./ServiceDetailModal";
import PaymentModal from "./PaymentModal";
import { Button } from "./ui/button";

const slides = [
  {
    title: "Desarrollo Web – Básico",
    price: "€950",
    description: "Presencia online profesional: hasta 5 páginas, responsive, SEO básico y formulario de contacto.",
    perks: ["Hasta 5 páginas", "Responsive", "SEO básico", "Formulario de contacto", "Hosting 1 año"],
    image: web1,
  },
  {
    title: "Desarrollo Web – Profesional",
    price: "€1,450",
    description: "Ideal para crecer: pasarela de pago, panel de administración y analytics.",
    perks: ["Hasta 10 páginas", "Pasarela de pago", "Panel admin", "SEO avanzado", "Analytics"],
    image: web2,
  },
  {
    title: "Desarrollo Web – Premium",
    price: "€2,999",
    description: "Solución completa: e‑commerce, integraciones API, multiidioma y soporte prioritario.",
    perks: ["Páginas ilimitadas", "E‑commerce", "Integraciones API", "IA integrada", "Soporte 24/7"],
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
    setSelectedService(slides[current]);
    setPaymentModalOpen(true);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border">
      {/* Heading */}
      <header className="absolute z-20 top-4 left-4 flex items-center gap-2 text-white drop-shadow">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg md:text-xl font-semibold tracking-wide">Desarrollo WEB</h3>
      </header>

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
                <div>
                  <h4 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-gold bg-clip-text text-transparent">{s.title}</h4>
                  <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">{s.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Desde</p>
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent">{s.price}</p>
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
                  onClick={handlePurchase}
                  variant="premium"
                  className="bg-gradient-to-r from-primary to-primary-variant hover:opacity-90"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Comprar ahora
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
      <ServiceDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        service={{
          title: selectedService.title,
          description: selectedService.description,
          price: selectedService.price,
          details: {
            features: selectedService.perks,
            technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
            timeline: "2-4 semanas"
          }
        }}
        onSelectPayment={() => {
          setDetailModalOpen(false);
          setPaymentModalOpen(true);
        }}
      />
      
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        service={selectedService.title}
        price={selectedService.price}
      />
    </div>
  );
};

export default WebDevelopmentSlider;
