import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "ca";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.ai_consulting": "Asesoría IA",
    "nav.energy_savings": "Ahorro Energético",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.web_designs": "Diseños Web",
    "nav.start": "Comenzar",
    
    // Hero Section
    "hero.excellence": "EXCELENCIA TECNOLÓGICA",
    "hero.connect": "Conectamos",
    "hero.innovation": "Innovación y Éxito",
    "hero.subtitle": "Soluciones tecnológicas premium que transforman su visión en realidad digital",
    "hero.explore": "Explorar Servicios",
    "hero.consultation": "Consulta Gratuita",
    "hero.projects": "Proyectos Exitosos",
    "hero.clients": "Clientes Satisfechos",
    "hero.support": "Soporte Premium",
    
    // Services Section
    "services.title": "Servicios",
    "services.premium": "Premium",
    "services.subtitle": "Soluciones tecnológicas diseñadas para impulsar su éxito empresarial",
    "services.more_info": "Más Info",
    "services.view_all": "Ver Todos los Servicios",
    "services.basic": "Desarrollo Web - Básico",
    "services.basic_desc": "Web corporativa profesional con diseño responsive, SEO básico y formulario de contacto",
    "services.professional": "Desarrollo Web - Profesional",
    "services.professional_desc": "Web avanzada con pasarela de pago integrada, gestión de contenidos y analytics",
    "services.premium_web": "Desarrollo Web - Premium",
    "services.premium_web_desc": "Solución completa con todas las funcionalidades, personalización total y soporte prioritario",
    "services.mobile_apps": "Apps Móviles",
    "services.mobile_apps_desc": "Experiencias móviles nativas para iOS y Android",
    "services.chatbot": "ChatBot IA con Voz Humana",
    "services.chatbot_desc": "Asistente virtual inteligente con tecnología de voz natural para atención 24/7",
    "services.marketing": "Marketing Digital",
    "services.marketing_desc": "Estrategias digitales para maximizar su presencia online",
    "services.ai_ml": "IA & Machine Learning",
    "services.ai_ml_desc": "Soluciones inteligentes que transforman sus datos en valor",
    
    // About Section
    "about.leaders": "Líderes",
    "about.innovation": "Innovación Tecnológica",
    "about.description1": "Desde Andorra, conectamos empresas con soluciones tecnológicas de vanguardia. Nuestro equipo de expertos combina creatividad, innovación y excelencia técnica para transformar ideas en realidades digitales exitosas.",
    "about.description2": "Nos especializamos en crear experiencias digitales que no solo cumplen objetivos empresariales, sino que también establecen nuevos estándares en la industria.",
    "about.years": "Años de Experiencia",
    "about.experts": "Expertos en el Equipo",
    "about.satisfaction": "Satisfacción del Cliente",
    "about.countries": "Países Atendidos",
    "about.mission": "Nuestra Misión",
    "about.mission_text": "Empoderar a las empresas con tecnología de última generación, creando soluciones que impulsan el crecimiento y la transformación digital.",
    "about.values": "Nuestros Valores",
    "about.excellence": "Excelencia:",
    "about.excellence_text": "Calidad sin compromisos en cada proyecto",
    "about.innovation_value": "Innovación:",
    "about.innovation_text": "Siempre a la vanguardia tecnológica",
    "about.transparency": "Transparencia:",
    "about.transparency_text": "Comunicación clara y honesta",
    "about.commitment": "Compromiso:",
    "about.commitment_text": "Su éxito es nuestro objetivo",
    
    // AI Consulting Section
    "ai.consulting": "Asesoría Empresas",
    "ai.in_ai": "en IA",
    "ai.subtitle": "Transformamos su empresa con inteligencia artificial de vanguardia. Desde la estrategia hasta la implementación, le acompañamos en cada paso de su viaje hacia la innovación.",
    "ai.view_more": "Ver más →",
    "ai.start_transformation": "Comience su Transformación Digital con IA",
    "ai.cta_text": "Agenda una consulta gratuita con nuestros expertos en IA y descubra cómo podemos revolucionar su negocio con tecnología inteligente.",
    "ai.request_consultation": "Solicitar Consulta Gratuita",
    "ai.download_guide": "Descargar Guía IA",
    "ai.projects_completed": "Proyectos IA Completados",
    "ai.cost_reduction": "Reducción de Costes",
    "ai.productivity_increase": "Aumento Productividad",
    "ai.satisfied_clients": "Clientes Satisfechos",
    "ai.personalized": "Inteligencia Artificial Personalizada",
    "ai.personalized_desc": "Desarrollamos soluciones de IA adaptadas a las necesidades específicas de su empresa",
    "ai.automation": "Automatización de Procesos",
    "ai.automation_desc": "Optimizamos sus operaciones mediante automatización inteligente",
    "ai.virtual_assistants": "Asistentes Virtuales",
    "ai.virtual_assistants_desc": "Chatbots y asistentes IA para mejorar la atención al cliente 24/7",
    "ai.predictive": "Análisis Predictivo",
    "ai.predictive_desc": "Transforme sus datos en insights accionables con machine learning",
    "ai.integration": "Integración Rápida",
    "ai.integration_desc": "Implementación ágil de soluciones IA en su infraestructura existente",
    "ai.ethical": "IA Ética y Segura",
    "ai.ethical_desc": "Desarrollo responsable con máximos estándares de seguridad y privacidad",
    
    // Contact Section
    "contact.connect": "Conectemos",
    "contact.subtitle": "Estamos aquí para transformar sus ideas en realidad digital",
    "contact.info_title": "Información de Contacto",
    "contact.email": "Email",
    "contact.whatsapp": "WhatsApp",
    "contact.telegram": "Telegram",
    "contact.address": "Dirección",
    "contact.hours": "Horario de Atención",
    "contact.monday_friday": "Lunes - Viernes",
    "contact.saturday": "Sábado",
    "contact.sunday": "Domingo",
    "contact.closed": "Cerrado",
    "contact.send_message": "Envíenos un Mensaje",
    "contact.full_name": "Nombre Completo",
    "contact.email_label": "Correo Electrónico",
    "contact.phone": "Teléfono (Opcional)",
    "contact.message": "Mensaje",
    "contact.message_placeholder": "Cuéntenos sobre su proyecto...",
    "contact.budget": "Rango de Presupuesto",
    "contact.select_budget": "Seleccionar presupuesto",
    "contact.budget_less_2000": "Menos de 2.000€",
    "contact.budget_less_5000": "Menos de 5.000€",
    "contact.budget_more_6000": "Más de 6.000€",
    "contact.submit": "Enviar Mensaje",
    "contact.submitting": "Enviando...",
    
    // Testimonials
    "testimonials.title": "Lo Que Dicen Nuestros Clientes",
    "testimonials.subtitle": "Más de 200 empresas confían en nosotros para impulsar su transformación digital y optimizar sus costes energéticos",
    "testimonials.swipe": "Desliza para ver más testimonios →",
    
    // Footer
    "footer.description": "Soluciones tecnológicas premium que transforman su visión en realidad digital. Innovación y excelencia en cada proyecto.",
    "footer.quick_links": "Enlaces Rápidos",
    "footer.legal": "Legal",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos y Condiciones",
    "footer.cookies": "Política de Cookies",
    "footer.legal_notice": "Aviso Legal",
    "footer.rights": "Todos los derechos reservados.",
    "footer.designed": "Diseñado con excelencia en Andorra 🇦🇩",
    
    // Web Packages
    "packages.basic": "Básico",
    "packages.professional": "Profesional",
    "packages.premium": "Premium",
  },
  ca: {
    // Navbar
    "nav.home": "Inici",
    "nav.ai_consulting": "Assessoria IA",
    "nav.energy_savings": "Estalvi Energètic",
    "nav.about": "Nosaltres",
    "nav.contact": "Contacte",
    "nav.web_designs": "Dissenys Web",
    "nav.start": "Començar",
    
    // Hero Section
    "hero.excellence": "EXCEL·LÈNCIA TECNOLÒGICA",
    "hero.connect": "Connectem",
    "hero.innovation": "Innovació i Èxit",
    "hero.subtitle": "Solucions tecnològiques premium que transformen la seva visió en realitat digital",
    "hero.explore": "Explorar Serveis",
    "hero.consultation": "Consulta Gratuïta",
    "hero.projects": "Projectes Reeixits",
    "hero.clients": "Clients Satisfets",
    "hero.support": "Suport Premium",
    
    // Services Section
    "services.title": "Serveis",
    "services.premium": "Premium",
    "services.subtitle": "Solucions tecnològiques dissenyades per impulsar el seu èxit empresarial",
    "services.more_info": "Més Info",
    "services.view_all": "Veure Tots els Serveis",
    "services.basic": "Desenvolupament Web - Bàsic",
    "services.basic_desc": "Web corporativa professional amb disseny responsive, SEO bàsic i formulari de contacte",
    "services.professional": "Desenvolupament Web - Professional",
    "services.professional_desc": "Web avançada amb passarel·la de pagament integrada, gestió de continguts i analytics",
    "services.premium_web": "Desenvolupament Web - Premium",
    "services.premium_web_desc": "Solució completa amb totes les funcionalitats, personalització total i suport prioritari",
    "services.mobile_apps": "Apps Mòbils",
    "services.mobile_apps_desc": "Experiències mòbils natives per a iOS i Android",
    "services.chatbot": "ChatBot IA amb Veu Humana",
    "services.chatbot_desc": "Assistent virtual intel·ligent amb tecnologia de veu natural per a atenció 24/7",
    "services.marketing": "Màrqueting Digital",
    "services.marketing_desc": "Estratègies digitals per maximitzar la seva presència online",
    "services.ai_ml": "IA & Machine Learning",
    "services.ai_ml_desc": "Solucions intel·ligents que transformen les seves dades en valor",
    
    // About Section
    "about.leaders": "Líders",
    "about.innovation": "Innovació Tecnològica",
    "about.description1": "Des d'Andorra, connectem empreses amb solucions tecnològiques d'avantguarda. El nostre equip d'experts combina creativitat, innovació i excel·lència tècnica per transformar idees en realitats digitals reeixides.",
    "about.description2": "Ens especialitzem a crear experiències digitals que no només compleixen objectius empresarials, sinó que també estableixen nous estàndards a la indústria.",
    "about.years": "Anys d'Experiència",
    "about.experts": "Experts a l'Equip",
    "about.satisfaction": "Satisfacció del Client",
    "about.countries": "Països Atesos",
    "about.mission": "La Nostra Missió",
    "about.mission_text": "Empoderar les empreses amb tecnologia d'última generació, creant solucions que impulsen el creixement i la transformació digital.",
    "about.values": "Els Nostres Valors",
    "about.excellence": "Excel·lència:",
    "about.excellence_text": "Qualitat sense compromisos en cada projecte",
    "about.innovation_value": "Innovació:",
    "about.innovation_text": "Sempre a l'avantguarda tecnològica",
    "about.transparency": "Transparència:",
    "about.transparency_text": "Comunicació clara i honesta",
    "about.commitment": "Compromís:",
    "about.commitment_text": "El seu èxit és el nostre objectiu",
    
    // AI Consulting Section
    "ai.consulting": "Assessoria Empreses",
    "ai.in_ai": "en IA",
    "ai.subtitle": "Transformem la seva empresa amb intel·ligència artificial d'avantguarda. Des de l'estratègia fins a la implementació, l'acompanyem en cada pas del seu viatge cap a la innovació.",
    "ai.view_more": "Veure més →",
    "ai.start_transformation": "Comenci la seva Transformació Digital amb IA",
    "ai.cta_text": "Agenda una consulta gratuïta amb els nostres experts en IA i descobreixi com podem revolucionar el seu negoci amb tecnologia intel·ligent.",
    "ai.request_consultation": "Sol·licitar Consulta Gratuïta",
    "ai.download_guide": "Descarregar Guia IA",
    "ai.projects_completed": "Projectes IA Completats",
    "ai.cost_reduction": "Reducció de Costos",
    "ai.productivity_increase": "Augment Productivitat",
    "ai.satisfied_clients": "Clients Satisfets",
    "ai.personalized": "Intel·ligència Artificial Personalitzada",
    "ai.personalized_desc": "Desenvolupem solucions d'IA adaptades a les necessitats específiques de la seva empresa",
    "ai.automation": "Automatització de Processos",
    "ai.automation_desc": "Optimitzem les seves operacions mitjançant automatització intel·ligent",
    "ai.virtual_assistants": "Assistents Virtuals",
    "ai.virtual_assistants_desc": "Chatbots i assistents IA per millorar l'atenció al client 24/7",
    "ai.predictive": "Anàlisi Predictiva",
    "ai.predictive_desc": "Transformi les seves dades en insights accionables amb machine learning",
    "ai.integration": "Integració Ràpida",
    "ai.integration_desc": "Implementació àgil de solucions IA a la seva infraestructura existent",
    "ai.ethical": "IA Ètica i Segura",
    "ai.ethical_desc": "Desenvolupament responsable amb màxims estàndards de seguretat i privacitat",
    
    // Contact Section
    "contact.connect": "Connectem",
    "contact.subtitle": "Som aquí per transformar les seves idees en realitat digital",
    "contact.info_title": "Informació de Contacte",
    "contact.email": "Correu electrònic",
    "contact.whatsapp": "WhatsApp",
    "contact.telegram": "Telegram",
    "contact.address": "Adreça",
    "contact.hours": "Horari d'Atenció",
    "contact.monday_friday": "Dilluns - Divendres",
    "contact.saturday": "Dissabte",
    "contact.sunday": "Diumenge",
    "contact.closed": "Tancat",
    "contact.send_message": "Envieu-nos un Missatge",
    "contact.full_name": "Nom Complet",
    "contact.email_label": "Correu Electrònic",
    "contact.phone": "Telèfon (Opcional)",
    "contact.message": "Missatge",
    "contact.message_placeholder": "Expliqui'ns el seu projecte...",
    "contact.budget": "Rang de Pressupost",
    "contact.select_budget": "Seleccionar pressupost",
    "contact.budget_less_2000": "Menys de 2.000€",
    "contact.budget_less_5000": "Menys de 5.000€",
    "contact.budget_more_6000": "Més de 6.000€",
    "contact.submit": "Enviar Missatge",
    "contact.submitting": "Enviant...",
    
    // Testimonials
    "testimonials.title": "El Que Diuen els Nostres Clients",
    "testimonials.subtitle": "Més de 200 empreses confien en nosaltres per impulsar la seva transformació digital i optimitzar els seus costos energètics",
    "testimonials.swipe": "Llisca per veure més testimonis →",
    
    // Footer
    "footer.description": "Solucions tecnològiques premium que transformen la seva visió en realitat digital. Innovació i excel·lència en cada projecte.",
    "footer.quick_links": "Enllaços Ràpids",
    "footer.legal": "Legal",
    "footer.privacy": "Política de Privacitat",
    "footer.terms": "Termes i Condicions",
    "footer.cookies": "Política de Cookies",
    "footer.legal_notice": "Avís Legal",
    "footer.rights": "Tots els drets reservats.",
    "footer.designed": "Dissenyat amb excel·lència a Andorra 🇦🇩",
    
    // Web Packages
    "packages.basic": "Bàsic",
    "packages.professional": "Professional",
    "packages.premium": "Premium",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
