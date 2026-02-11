import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12">
      <SEOHead title="Política de Privacidad | Andorra Tech" description="Política de privacidad de Andorra Tech. Protección de datos personales conforme al RGPD." canonical="https://www.andorratech.net/politica-privacidad" />
      <Breadcrumbs />
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
          Política de Privacidad
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Información al Usuario</h2>
            <p>
              Tech-Grup 2023 SLU, como Responsable del Tratamiento, le informa que, según lo dispuesto 
              en la Llei 15/2003, del 18 de desembre, qualificada de protecció de dades personals del 
              Principat d'Andorra, sus datos personales serán tratados y quedarán incorporados en los 
              ficheros de la empresa, debidamente inscritos en el Registre de l'Agència Andorrana de 
              Protecció de Dades (APDA).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Finalidad del Tratamiento</h2>
            <p>Los datos personales que recopilamos serán utilizados para las siguientes finalidades:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestión de clientes y servicios contratados</li>
              <li>Envío de información comercial sobre nuestros productos y servicios</li>
              <li>Gestión de consultas y solicitudes de información</li>
              <li>Cumplimiento de obligaciones legales y fiscales</li>
              <li>Mejora de nuestros servicios y atención al cliente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Legitimación</h2>
            <p>
              La base legal para el tratamiento de sus datos personales es:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>El consentimiento del interesado</li>
              <li>La ejecución de un contrato</li>
              <li>El cumplimiento de obligaciones legales</li>
              <li>El interés legítimo del responsable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Destinatarios</h2>
            <p>
              Sus datos no serán comunicados a terceros, salvo obligación legal o cuando sea necesario 
              para la prestación del servicio contratado. En particular, podrán ser comunicados a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Administraciones públicas competentes</li>
              <li>Entidades bancarias para la gestión de cobros y pagos</li>
              <li>Proveedores de servicios tecnológicos necesarios para la prestación del servicio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Conservación de Datos</h2>
            <p>
              Los datos personales proporcionados se conservarán durante el tiempo necesario para 
              cumplir con la finalidad para la que se recabaron y para determinar las posibles 
              responsabilidades que se pudieran derivar de dicha finalidad y del tratamiento de los datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Derechos del Usuario</h2>
            <p>
              Usted tiene derecho a obtener confirmación sobre si estamos tratando sus datos personales 
              y, por tanto, tiene derecho a ejercer sus derechos de acceso, rectificación, limitación 
              del tratamiento, portabilidad, oposición y supresión de sus datos dirigiéndose a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Email:</strong> protecciodades@andorratech.net</li>
              <li><strong>Dirección postal:</strong> C/ Escoles N2 Ed Noguera despatx 16, AD600 Sant Julia de Loria</li>
            </ul>
            <p className="mt-4">
              Asimismo, le informamos que puede presentar una reclamación ante la Agència Andorrana 
              de Protecció de Dades (APDA) si considera que el tratamiento no se ajusta a la normativa vigente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Seguridad</h2>
            <p>
              Tech-Grup 2023 SLU ha adoptado las medidas de seguridad técnicas y organizativas necesarias 
              para garantizar la seguridad e integridad de los datos, así como para evitar su pérdida, 
              alteración y/o acceso por parte de terceros no autorizados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cookies</h2>
            <p>
              Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de usuario 
              y proporcionar el mejor servicio posible. Puede consultar nuestra Política de Cookies para 
              más información.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;