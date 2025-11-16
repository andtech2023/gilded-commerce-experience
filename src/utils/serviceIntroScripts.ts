// Scripts de introducción para cada servicio (30 segundos aprox)
export const getServiceIntroScript = (title: string): string => {
  const scripts: { [key: string]: string } = {
    // Servicios principales
    "Apps Móviles": "Bienvenido a nuestro servicio de Apps Móviles. Desarrollamos experiencias móviles nativas para iOS y Android utilizando React Native. Nuestras aplicaciones ofrecen diseño UX UI de última generación, integración perfecta con APIs y automatizaciones personalizables para tu negocio. Transformamos tus ideas en aplicaciones móviles que tus usuarios amarán. ¿Listo para llevar tu negocio al móvil?",
    
    "ChatBot IA con Voz Humana": "Descubre nuestro revolucionario ChatBot con Inteligencia Artificial y Voz Humana. Ofrecemos asistencia virtual las 24 horas, los 7 días de la semana, con una voz natural que hace sentir a tus clientes como si hablaran con una persona real. Incluye respuestas en tiempo real, integración con WhatsApp y automatizaciones personalizables. Mejora la atención al cliente mientras reduces costes operativos. ¿Preparado para revolucionar tu atención al cliente?",
    
    "Marketing Digital": "Bienvenido a nuestros servicios de Marketing Digital. Desarrollamos estrategias digitales completas para maximizar tu presencia online. Ofrecemos SEO y SEM avanzado, gestión profesional de redes sociales, campañas de email marketing, analytics detallado y automatizaciones personalizables. Aumenta tu visibilidad, genera más leads y convierte visitantes en clientes. ¿Listo para dominar el mundo digital?",
    
    "IA & Machine Learning": "Descubre el poder de la Inteligencia Artificial y Machine Learning. Transformamos tus datos en valor con soluciones inteligentes que incluyen chatbots con IA, análisis predictivo avanzado, automatización de procesos, visión artificial y automatizaciones personalizables. Toma decisiones más inteligentes basadas en datos reales. ¿Preparado para revolucionar tu negocio con IA?",
    
    // Características de IA Consulting
    "Inteligencia Artificial Personalizada": "Bienvenido a nuestra consultoría en Inteligencia Artificial Personalizada. Nuestro equipo de expertos diseña e implementa soluciones de IA adaptadas específicamente a las necesidades de tu empresa. Desde chatbots avanzados hasta sistemas de recomendación, creamos tecnología que se integra perfectamente con tus procesos empresariales. Incluimos análisis inicial gratuito, desarrollo a medida, formación completa para tu equipo y soporte técnico continuado. ¿Listo para transformar tu negocio con IA?",
    
    "Automatización de Procesos": "Descubre cómo la Automatización de Procesos puede revolucionar tu empresa. Identificamos y automatizamos tareas repetitivas, liberando tiempo valioso de tu equipo para actividades estratégicas. Utilizamos inteligencia artificial para crear flujos de trabajo inteligentes que aprenden y mejoran con el tiempo. Reduce hasta un 80 por ciento las tareas repetitivas, minimiza errores humanos y aumenta la productividad. El retorno de inversión es medible en solo 3 a 6 meses. ¿Preparado para optimizar tus operaciones?",
    
    "Asistentes Virtuales": "Bienvenido al futuro de la atención al cliente con nuestros Asistentes Virtuales inteligentes. Implementamos chatbots y asistentes con IA que brindan atención las 24 horas del día, los 7 días de la semana. Responden preguntas frecuentes, procesan solicitudes y escalan casos complejos a tu equipo humano cuando es necesario. Ofrecen respuesta instantánea, reducen la carga de trabajo en servicio al cliente y mejoran continuamente mediante machine learning. ¿Listo para ofrecer atención al cliente sin interrupciones?",
    
    "Análisis Predictivo": "Descubre el poder del Análisis Predictivo con Machine Learning. Convertimos tus datos históricos en predicciones valiosas que impulsan decisiones estratégicas. Nuestros modelos identifican patrones, tendencias y oportunidades que serían imposibles de detectar manualmente. Predice tendencias de mercado, optimiza inventario y recursos, identifica oportunidades de ventas y detecta riesgos de forma temprana. Incluye dashboards interactivos y reportes automatizados. ¿Preparado para tomar decisiones basadas en datos inteligentes?",
    
    "Integración Rápida": "Conoce nuestro servicio de Integración Rápida de soluciones de Inteligencia Artificial. Sabemos que el tiempo es crítico para tu negocio. Por eso ofrecemos metodologías ágiles que minimizan la interrupción de tus operaciones mientras maximizamos el valor entregado. Implementación por fases para menor riesgo, compatibilidad con sistemas legacy, tiempo optimizado y pruebas exhaustivas antes del lanzamiento. Migración de datos segura y verificada. ¿Listo para implementar IA sin complicaciones?",
    
    "IA Ética y Segura": "Bienvenido a nuestro compromiso con la IA Ética y Segura. La seguridad y privacidad de tus datos es nuestra máxima prioridad. Cumplimos con todas las normativas internacionales y aplicamos las mejores prácticas de seguridad en cada proyecto. Ofrecemos cumplimiento total con RGPD y normativas locales, encriptación de datos de extremo a extremo, auditorías de seguridad regulares, transparencia en algoritmos de IA y formación en uso responsable de la tecnología. ¿Preparado para implementar IA con tranquilidad total?"
  };
  
  return scripts[title] || `Descubre todo lo que podemos hacer por ti con nuestro servicio de ${title}. Soluciones profesionales diseñadas específicamente para impulsar tu negocio y llevarlo al siguiente nivel.`;
};
