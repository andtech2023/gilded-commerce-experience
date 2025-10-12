import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CookiesPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Volver al inicio
        </Button>

        <h1 className="text-4xl font-serif font-bold mb-8 bg-gradient-gold bg-clip-text text-transparent">
          Política de Cookies
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. ¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando 
              visita nuestro sitio web. Estas cookies nos ayudan a mejorar su experiencia de navegación 
              y a proporcionarle un servicio más personalizado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Tipos de Cookies que Utilizamos</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">Cookies Técnicas</h3>
            <p>
              Son aquellas que permiten al usuario la navegación a través del sitio web y la utilización 
              de las diferentes opciones o servicios que en él existen.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">Cookies de Análisis</h3>
            <p>
              Son aquellas que nos permiten cuantificar el número de usuarios y realizar el análisis 
              estadístico de la utilización que hacen los usuarios del servicio ofertado.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">Cookies de Preferencias</h3>
            <p>
              Son aquellas que permiten recordar información para que el usuario acceda al servicio 
              con determinadas características que pueden diferenciar su experiencia de la de otros usuarios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cookies de Terceros</h2>
            <p>
              En algunos casos, compartimos información sobre los visitantes de este sitio de forma 
              anónima o agregada con terceros como anunciantes, patrocinadores o auditores con el 
              único fin de mejorar nuestros servicios.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics:</strong> Para análisis estadístico del uso del sitio web</li>
              <li><strong>Stripe:</strong> Para el procesamiento seguro de pagos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Duración de las Cookies</h2>
            <p>Las cookies utilizadas en nuestro sitio web pueden ser:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies de sesión:</strong> Expiran cuando cierra el navegador</li>
              <li><strong>Cookies persistentes:</strong> Permanecen en su dispositivo durante un período determinado o hasta que las elimine manualmente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Gestión de Cookies</h2>
            <p>
              Puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la 
              configuración de las opciones del navegador instalado en su ordenador:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
              <li>Firefox: Opciones → Privacidad y seguridad → Cookies</li>
              <li>Safari: Preferencias → Privacidad → Cookies</li>
              <li>Edge: Configuración → Privacidad → Cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Consentimiento</h2>
            <p>
              Al navegar y continuar en nuestro sitio web, estará consintiendo el uso de las cookies 
              antes enunciadas, por los plazos señalados y en las condiciones contenidas en la presente 
              Política de Cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Actualización de la Política</h2>
            <p>
              Tech-Grup 2023 SLU puede modificar esta Política de Cookies en función de exigencias 
              legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las 
              instrucciones dictadas por la Agència Andorrana de Protecció de Dades.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contacto</h2>
            <p>
              Si tiene dudas sobre esta Política de Cookies, puede contactar con nosotros en:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Email:</strong> cookies@andorratech.net</li>
              <li><strong>Teléfono:</strong> +376 369 939</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;