import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12">
      <SEOHead title="Términos y Condiciones | Andorra Tech" description="Términos y condiciones de uso de los servicios de Andorra Tech." canonical="https://www.andorratech.net/terminos-condiciones" />
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
          Términos y Condiciones
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar los servicios de Tech-Grup 2023 SLU, usted acepta y se compromete 
              a cumplir estos términos y condiciones. Si no está de acuerdo con alguna parte de estos 
              términos, no debe utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Descripción de los Servicios</h2>
            <p>
              Tech-Grup 2023 SLU ofrece servicios de desarrollo tecnológico, consultoría en inteligencia 
              artificial, desarrollo web y móvil, soluciones cloud, ciberseguridad y marketing digital. 
              Los detalles específicos de cada servicio se acordarán mediante contrato individual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Condiciones de Pago</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Los precios de los servicios están expresados en euros (€) y no incluyen impuestos aplicables</li>
              <li>El pago se realizará según las condiciones acordadas en cada contrato</li>
              <li>Los servicios mensuales se facturarán por adelantado</li>
              <li>Los proyectos específicos requerirán un anticipo del 50% para iniciar el trabajo</li>
              <li>El incumplimiento de pago puede resultar en la suspensión o cancelación del servicio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Obligaciones del Cliente</h2>
            <p>El cliente se compromete a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proporcionar información veraz y actualizada</li>
              <li>Colaborar activamente en el desarrollo del proyecto</li>
              <li>Proporcionar los recursos y accesos necesarios para la prestación del servicio</li>
              <li>Respetar los derechos de propiedad intelectual</li>
              <li>Cumplir con los plazos de pago establecidos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Propiedad Intelectual</h2>
            <p>
              Salvo acuerdo en contrario, todos los derechos de propiedad intelectual sobre los 
              desarrollos realizados serán propiedad del cliente una vez completado el pago total 
              del proyecto. Tech-Grup 2023 SLU se reserva el derecho de utilizar el proyecto como 
              referencia en su portfolio, salvo acuerdo de confidencialidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Confidencialidad</h2>
            <p>
              Ambas partes se comprometen a mantener la confidencialidad de toda la información 
              intercambiada durante la prestación del servicio, incluyendo pero no limitándose a 
              datos técnicos, comerciales y estratégicos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Garantías y Limitaciones</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Tech-Grup 2023 SLU garantiza la calidad profesional de sus servicios</li>
              <li>Se ofrece garantía de 3 meses en desarrollos web para errores de programación</li>
              <li>No nos responsabilizamos por pérdidas derivadas de factores externos</li>
              <li>La responsabilidad máxima será el importe pagado por el servicio específico</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cancelación y Rescisión</h2>
            <p>
              Cualquiera de las partes puede rescindir el contrato con un preaviso de 30 días. 
              En caso de cancelación anticipada de proyectos, el cliente deberá abonar el trabajo 
              realizado hasta la fecha según las tarifas acordadas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Modificaciones</h2>
            <p>
              Tech-Grup 2023 SLU se reserva el derecho de modificar estos términos y condiciones 
              en cualquier momento. Las modificaciones serán notificadas a los clientes con 30 días 
              de antelación y entrarán en vigor en la fecha indicada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Resolución de Conflictos</h2>
            <p>
              Para la resolución de cualquier conflicto derivado de estos términos y condiciones, 
              las partes se someten a la jurisdicción de los tribunales del Principat d'Andorra, 
              renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Ley Aplicable</h2>
            <p>
              Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes 
              del Principat d'Andorra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contacto</h2>
            <p>Para cualquier consulta sobre estos términos y condiciones:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Email:</strong> legal@andorratech.net</li>
              <li><strong>Teléfono:</strong> +376 369 939</li>
              <li><strong>Dirección:</strong> C/ Escoles N2 Ed Noguera despatx 16, AD600 Sant Julia de Loria</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;