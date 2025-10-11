import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/andorratech-official-logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import WebPackageDetailModal from "./WebPackageDetailModal";
import PaymentModal from "./PaymentModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#asesoria-ia", label: "Asesoría IA" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ];

  const webDesignPackages = [
    { 
      name: "Básico", 
      price: "750€",
      description: "Presencia online profesional ideal para pequeños negocios y startups.",
      features: [
        "Hasta 5 páginas optimizadas",
        "Diseño responsive adaptado a todos los dispositivos",
        "SEO básico para mejorar visibilidad",
        "Formulario de contacto funcional",
        "Hosting gratuito durante 1 año",
        "Soporte técnico durante 3 meses"
      ],
      deliveryTime: "2-3 semanas"
    },
    { 
      name: "Profesional", 
      price: "1.500€",
      description: "Solución completa para empresas en crecimiento que necesitan funcionalidades avanzadas.",
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
      deliveryTime: "3-4 semanas"
    },
    { 
      name: "Premium", 
      price: "2.500€",
      description: "La solución más completa con todas las funcionalidades empresariales y soporte prioritario.",
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
      deliveryTime: "4-6 semanas"
    },
  ];

  const handlePackageClick = (pkg: any) => {
    setSelectedPackage(pkg);
    setShowPackageModal(true);
    setIsMobileMenuOpen(false);
  };

  const handlePurchase = () => {
    setShowPaymentModal(true);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-elegant"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="AndorraTech" className="h-16 md:h-20 w-auto object-contain" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
            
            {/* Diseños Web Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground/80 hover:text-primary bg-transparent">
                    Diseños Web
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-4 bg-background">
                      {webDesignPackages.map((pkg) => (
                        <li key={pkg.name}>
                          <button
                            onClick={() => handlePackageClick(pkg)}
                            className="w-full text-left block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium leading-none">{pkg.name}</div>
                              <div className="text-sm font-bold text-primary">{pkg.price}</div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button 
              variant="premium" 
              size="lg"
              onClick={() => {
                const element = document.getElementById('asesoria-ia');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Comenzar
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-lg border-b border-border">
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              
              {/* Mobile Diseños Web Section */}
              <div className="border-t border-border pt-4">
                <div className="text-foreground/80 font-medium mb-2">Diseños Web</div>
                <div className="flex flex-col space-y-2 pl-4">
                  {webDesignPackages.map((pkg) => (
                    <button
                      key={pkg.name}
                      onClick={() => handlePackageClick(pkg)}
                      className="w-full text-left text-muted-foreground hover:text-primary transition-colors duration-300 py-1 flex items-center justify-between"
                    >
                      <span>{pkg.name}</span>
                      <span className="text-primary font-semibold">{pkg.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                variant="premium" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const element = document.getElementById('asesoria-ia');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Comenzar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedPackage && (
        <>
          <WebPackageDetailModal
            isOpen={showPackageModal}
            onClose={() => setShowPackageModal(false)}
            package={selectedPackage}
            onPurchase={handlePurchase}
          />
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            service={`Desarrollo Web ${selectedPackage.name}`}
            price={selectedPackage.price}
          />
        </>
      )}
    </nav>
  );
};

export default Navbar;