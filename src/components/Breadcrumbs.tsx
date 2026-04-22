import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const routeNamesByLang: Record<"es" | "ca", Record<string, string>> = {
  es: {
    "/ahorro-energetico": "Ahorro Energético",
    "/soluciones-empresas-ahorro-energetico": "Soluciones Empresas",
    "/aviso-legal": "Aviso Legal",
    "/politica-privacidad": "Política de Privacidad",
    "/politica-cookies": "Política de Cookies",
    "/terminos-condiciones": "Términos y Condiciones",
    "/payment-success": "Pago Exitoso",
    "/payment-cancelled": "Pago Cancelado",
  },
  ca: {
    "/ahorro-energetico": "Estalvi Energètic",
    "/soluciones-empresas-ahorro-energetico": "Solucions Empreses",
    "/aviso-legal": "Avís Legal",
    "/politica-privacidad": "Política de Privacitat",
    "/politica-cookies": "Política de Cookies",
    "/terminos-condiciones": "Termes i Condicions",
    "/payment-success": "Pagament Exitós",
    "/payment-cancelled": "Pagament Cancel·lat",
  },
};

const Breadcrumbs = () => {
  const location = useLocation();
  const { language } = useLanguage();

  if (location.pathname === "/") return null;

  const pageName =
    routeNamesByLang[language][location.pathname] ||
    (language === "ca" ? "Pàgina" : "Página");
  const homeLabel = language === "ca" ? "Inici" : "Inicio";

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-24 pb-2">
      <ol
        className="flex items-center gap-2 text-sm text-muted-foreground"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center gap-1"
        >
          <Link
            to="/"
            itemProp="item"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <Home size={14} />
            <span itemProp="name">{homeLabel}</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="text-foreground font-medium"
        >
          <span itemProp="name">{pageName}</span>
          <meta itemProp="position" content="2" />
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
