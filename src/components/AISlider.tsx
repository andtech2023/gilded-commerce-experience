import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import aiSlider1 from "@/assets/ai-slider-1.jpg";
import aiSlider2 from "@/assets/ai-slider-2.jpg";
import aiSlider3 from "@/assets/ai-slider-3.jpg";

const AISlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: aiSlider1,
      title: "Neural Networks",
      description: "Arquitecturas avanzadas de IA que transforman datos en decisiones inteligentes"
    },
    {
      image: aiSlider2,
      title: "Human-AI Collaboration",
      description: "La perfecta fusión entre inteligencia humana y artificial"
    },
    {
      image: aiSlider3,
      title: "Data Intelligence",
      description: "Visualización y procesamiento de datos a escala empresarial"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl group">
      {/* Futuristic overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 z-10 pointer-events-none animate-pulse" />
      
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-110'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <h3 className="text-3xl font-serif font-bold text-white mb-2 animate-fade-in">
                {slide.title}
              </h3>
              <p className="text-white/80 text-lg animate-fade-in animation-delay-200">
                {slide.description}
              </p>
            </div>
            
            {/* Futuristic corner elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50" />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-primary/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/40"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-primary/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/40"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 h-2 bg-primary'
                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Animated scan line effect */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
    </div>
  );
};

export default AISlider;