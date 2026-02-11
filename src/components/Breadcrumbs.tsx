import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeNames: Record<string, string> = {
  "/ahorro-energetico": "Ahorro Energético",
  "/aviso-legal": "Aviso Legal",
  "/politica-privacidad": "Política de Privacidad",
  "/politica-cookies": "Política de Cookies",
  "/terminos-condiciones": "Términos y Condiciones",
  "/payment-success": "Pago Exitoso",
  "/payment-cancelled": "Pago Cancelado",
};

const Breadcrumbs = () => {
  const location = useLocation();

  if (location.pathname === "/") return null;

  const pageName = routeNames[location.pathname] || "Página";

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
            <span itemProp="name">Inicio</span>
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
