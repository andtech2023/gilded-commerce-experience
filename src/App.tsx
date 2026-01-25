import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import TermsConditions from "./pages/TermsConditions";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import AhorroEnergetico from "./pages/AhorroEnergetico";
import LanguageGate from "./components/LanguageGate";

const queryClient = new QueryClient();

const AppContent = () => {
  const { setLanguage } = useLanguage();

  const handleLanguageSelect = (lang: "es" | "ca") => {
    setLanguage(lang);
    document.documentElement.lang = lang;
  };

  return (
    <LanguageGate onLanguageSelect={handleLanguageSelect}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ahorro-energetico" element={<AhorroEnergetico />} />
        <Route path="/aviso-legal" element={<LegalNotice />} />
        <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
        <Route path="/politica-cookies" element={<CookiesPolicy />} />
        <Route path="/terminos-condiciones" element={<TermsConditions />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageGate>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
