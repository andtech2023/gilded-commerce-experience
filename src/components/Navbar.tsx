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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: "Básico", price: "750€", href: "#servicios" },
    { name: "Profesional", price: "1.500€", href: "#servicios" },
    { name: "Premium", price: "2.500€", href: "#servicios" },
  ];

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
                    <ul className="grid w-[300px] gap-2 p-4">
                      {webDesignPackages.map((pkg) => (
                        <li key={pkg.name}>
                          <a
                            href={pkg.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium leading-none">{pkg.name}</div>
                              <div className="text-sm font-bold text-primary">{pkg.price}</div>
                            </div>
                          </a>
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
                    <a
                      key={pkg.name}
                      href={pkg.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 py-1 flex items-center justify-between"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{pkg.name}</span>
                      <span className="text-primary font-semibold">{pkg.price}</span>
                    </a>
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
    </nav>
  );
};

export default Navbar;