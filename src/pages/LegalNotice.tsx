import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LegalNotice = () => {
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
          Aviso Legal
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Datos Identificativos</h2>
            <p>
              En cumplimiento con el deber de información recogido en la Llei 15/2003, del 18 de desembre, 
              qualificada de protecció de dades personals del Principat d'Andorra, se le informa:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Titular:</strong> Andorra Tech S.L.</li>
              <li><strong>NRT:</strong> L-XXXXXX-X</li>
              <li><strong>Domicilio:</strong> C/ Escoles N2 Ed Noguera despatx 16, AD600 Sant Julia de Loria, Principat d'Andorra</li>
              <li><strong>Teléfono:</strong> +376 369 939</li>
              <li><strong>Email:</strong> info@andorratech.net</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Objeto</h2>
            <p>
              El presente sitio web ha sido diseñado para dar a conocer los servicios ofertados por 
              Andorra Tech S.L., así como permitir el acceso general a la información de la empresa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Condiciones de Uso</h2>
            <p>
              La utilización del sitio web le otorga la condición de usuario e implica la aceptación 
              de todas las condiciones incluidas en este Aviso Legal. El usuario se compromete a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hacer un uso adecuado y lícito del sitio web</li>
              <li>No realizar actividades ilícitas o contrarias a la buena fe</li>
              <li>No difundir contenidos o propaganda de carácter racista, xenófobo o ilegal</li>
              <li>No causar daños en los sistemas físicos y lógicos del sitio web</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Propiedad Intelectual</h2>
            <p>
              Todos los contenidos del sitio web, incluyendo textos, imágenes, gráficos, logos, 
              iconos, botones, software, nombres comerciales, marcas, o cualquier otro signo 
              susceptible de utilización industrial y/o comercial están protegidos por derechos 
              de propiedad intelectual e industrial de Andorra Tech S.L.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Legislación Aplicable</h2>
            <p>
              Las presentes condiciones generales se rigen por la legislación andorrana. Para la 
              resolución de cualquier conflicto que pudiera derivarse del acceso al sitio web, 
              se someten a los Juzgados y Tribunales del Principat d'Andorra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Responsabilidad</h2>
            <p>
              Andorra Tech S.L. no se hace responsable del mal uso que se realice de los contenidos 
              del sitio web, siendo exclusiva responsabilidad de la persona que accede a ellos o 
              los utilice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;