import { Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react";
import logo from "@/assets/logo-at.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img src={logo} alt="Andorra Tech" className="h-16 w-auto" />
            </div>
            <p className="text-muted-foreground max-w-md">
              Soluciones tecnológicas premium que transforman su visión en realidad digital. 
              Innovación y excelencia en cada proyecto.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com/andorratech" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/andorratech" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com/company/andorratech" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com/andorratech" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://github.com/andorratech" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#asesoria-ia" className="text-muted-foreground hover:text-primary transition-colors">
                  Asesoría IA
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-muted-foreground hover:text-primary transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/politica-privacidad" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/terminos-condiciones" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="/politica-cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="/aviso-legal" className="text-muted-foreground hover:text-primary transition-colors">
                  Aviso Legal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Andorra Tech. Todos los derechos reservados.
            </p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">
              Diseñado con excelencia en Andorra 🇦🇩
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;