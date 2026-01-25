import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    name: "Carlos Martínez",
    company: "Panadería El Horno Dorado",
    location: "Barcelona",
    service: "Estudio Energético",
    text: "Gracias al estudio energético de AndorraTech, hemos conseguido ahorrar más de 3.000€ al año en luz y gas al cambiar de comercializadora. Una inversión que se pagó sola en el primer mes.",
    rating: 5,
    industry: "Industria Alimentaria"
  },
  {
    name: "Laura Fernández",
    company: "Boutique Mar y Sol",
    location: "Valencia",
    service: "Diseño Web",
    text: "Nuestro nuevo sitio web ha aumentado las ventas online un 150% en solo 3 meses. El diseño es moderno, rápido y exactamente lo que necesitábamos.",
    rating: 5,
    industry: "Retail"
  },
  {
    name: "Javier Ruiz",
    company: "Consultoría Avanza",
    location: "Madrid",
    service: "Marketing Digital",
    text: "La estrategia de marketing digital ha triplicado nuestros leads cualificados. El equipo de AndorraTech entendió perfectamente nuestro sector y objetivos.",
    rating: 5,
    industry: "Servicios Profesionales"
  },
  {
    name: "Ana García",
    company: "Restaurante La Terraza",
    location: "Sevilla",
    service: "Gestión de Redes Sociales",
    text: "Desde que AndorraTech gestiona nuestras redes sociales, hemos pasado de 500 a 8.000 seguidores en Instagram. Las reservas han aumentado un 40%.",
    rating: 5,
    industry: "Hostelería"
  },
  {
    name: "Miguel Ángel Torres",
    company: "Taller Mecánico Torres",
    location: "Bilbao",
    service: "Estudio Energético",
    text: "El cambio de comercializadora que nos recomendaron nos ahorra 2.400€ anuales. Increíble cómo algo tan simple puede tener tanto impacto en nuestros costes.",
    rating: 5,
    industry: "Servicios Automotriz"
  },
  {
    name: "Patricia López",
    company: "Estudio de Arquitectura PL",
    location: "Granada",
    service: "Diseño Web",
    text: "El portfolio online que nos diseñaron es espectacular. Hemos conseguido 5 proyectos importantes en 6 meses solo a través de la web.",
    rating: 5,
    industry: "Arquitectura"
  },
  {
    name: "Roberto Sánchez",
    company: "Farmacia San Juan",
    location: "Zaragoza",
    service: "Marketing Digital",
    text: "Las campañas de Google Ads han sido un éxito rotundo. Nuestro ROI es del 300% y seguimos creciendo mes a mes.",
    rating: 5,
    industry: "Salud"
  },
  {
    name: "Isabel Moreno",
    company: "Centro de Estética Bella Vita",
    location: "Málaga",
    service: "Gestión de Redes Sociales",
    text: "Nuestra presencia en redes sociales ha transformado nuestro negocio. Ahora tenemos lista de espera para los tratamientos más demandados.",
    rating: 5,
    industry: "Belleza y Bienestar"
  },
  {
    name: "Francisco Jiménez",
    company: "Carpintería Jiménez e Hijos",
    location: "Toledo",
    service: "Diseño Web",
    text: "Necesitábamos una web que mostrara la calidad de nuestro trabajo artesanal. El resultado superó todas nuestras expectativas.",
    rating: 5,
    industry: "Artesanía"
  },
  {
    name: "Carmen Díaz",
    company: "Pastelería Dulce Hogar",
    location: "Tarragona",
    service: "Estudio Energético",
    text: "Cambiar de comercializadora energética nos ahorra 2.800€ al año. Con esos ahorros hemos podido invertir en nueva maquinaria.",
    rating: 5,
    industry: "Industria Alimentaria"
  }
];

const TestimonialsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border-border bg-card hover:shadow-lg transition-all duration-300 hover-scale">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>

                    <Quote className="w-8 h-8 text-primary/30 mb-3" />
                    
                    <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">
                      "{testimonial.text}"
                    </p>

                    <div className="space-y-2">
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground">{testimonial.location}</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {testimonial.service}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-primary/10 border-primary/20 hover:bg-primary/20" />
          <CarouselNext className="hidden md:flex -right-12 bg-primary/10 border-primary/20 hover:bg-primary/20" />
        </Carousel>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>{t("testimonials.swipe")}</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
