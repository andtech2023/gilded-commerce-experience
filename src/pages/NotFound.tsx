import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { language } = useLanguage();
  const tr = (es: string, ca: string) => (language === "ca" ? ca : es);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <p className="text-muted-foreground mb-4">{tr("Página no encontrada", "Pàgina no trobada")}</p>
        <a href="/" className="text-primary hover:underline">{tr("Inicio", "Inici")}</a>
      </div>
    </div>
  );
};

export default NotFound;
