import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import ParticleEffect from "./ParticleEffect";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
      </div>

      {/* Particle Effect */}
      <ParticleEffect />

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <span className="text-primary font-medium tracking-wide">EXCELENCIA TECNOLÓGICA</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-futuristic-gold">Conectamos</span>
            <br />
            <span className="text-beige-soft">Innovación y Éxito</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Soluciones tecnológicas premium que transforman su visión en realidad digital
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
            <Button 
              variant="premium" 
              size="xl" 
              className="group"
              onClick={() => scrollToSection('servicios')}
            >
              Explorar Servicios
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => scrollToSection('contacto')}
            >
              Consulta Gratuita
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in animation-delay-600">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">100+</div>
              <div className="text-sm text-muted-foreground">Proyectos Exitosos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">50+</div>
              <div className="text-sm text-muted-foreground">Clientes Satisfechos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">24/7</div>
              <div className="text-sm text-muted-foreground">Soporte Premium</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;