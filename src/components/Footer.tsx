import { Facebook, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/andorratech-official-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img src={logo} alt="AndorraTech" className="h-20 w-auto object-contain" />
            </div>
            <p className="text-muted-foreground max-w-md">
              {t("footer.description")}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Tech-grup 2023 SLU - NRT: L718140P
            </p>
            <div className="flex space-x-4 mt-6 relative z-10">
              <a 
                href="https://www.instagram.com/andorratech/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" 
                aria-label="Instagram"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://www.instagram.com/andorratech/', '_blank', 'noopener,noreferrer');
                }}
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61582010190698" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" 
                aria-label="Facebook"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://www.facebook.com/profile.php?id=61582010190698', '_blank', 'noopener,noreferrer');
                }}
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/andorratech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" 
                aria-label="LinkedIn"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://www.linkedin.com/company/andorratech', '_blank', 'noopener,noreferrer');
                }}
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.tiktok.com/@andorratech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" 
                aria-label="TikTok"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://www.tiktok.com/@andorratech', '_blank', 'noopener,noreferrer');
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.quick_links")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("services.title")}
                </a>
              </li>
              <li>
                <a href="#asesoria-ia" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.ai_consulting")}
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/politica-privacidad" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a href="/terminos-condiciones" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.terms")}
                </a>
              </li>
              <li>
                <a href="/politica-cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.cookies")}
                </a>
              </li>
              <li>
                <a href="/aviso-legal" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.legal_notice")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Tech-grup 2023 SLU. {t("footer.rights")}
            </p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">
              {t("footer.designed")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
