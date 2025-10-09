import { Award, Users, TrendingUp, Globe } from "lucide-react";

const stats = [
  { icon: Award, value: "10+", label: "Años de Experiencia" },
  { icon: Users, value: "50+", label: "Expertos en el Equipo" },
  { icon: TrendingUp, value: "95%", label: "Satisfacción del Cliente" },
  { icon: Globe, value: "15+", label: "Países Atendidos" },
];

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-3d-gold">
              <span className="text-gradient-gold">Líderes</span> en
              <br />
              Innovación Tecnológica
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              Desde Andorra, conectamos empresas con soluciones tecnológicas de vanguardia. 
              Nuestro equipo de expertos combina creatividad, innovación y excelencia técnica 
              para transformar ideas en realidades digitales exitosas.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              Nos especializamos en crear experiencias digitales que no solo cumplen objetivos 
              empresariales, sino que también establecen nuevos estándares en la industria.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center flex-shrink-0">
                    <stat.icon className="text-primary-foreground" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-gold opacity-10 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-card border border-border rounded-3xl p-10">
              <h3 className="text-2xl font-serif font-semibold mb-6 text-gradient-gold">
                Nuestra Misión
              </h3>
              <p className="text-muted-foreground mb-6">
                Empoderar a las empresas con tecnología de última generación, 
                creando soluciones que impulsan el crecimiento y la transformación digital.
              </p>
              
              <h3 className="text-2xl font-serif font-semibold mb-6 text-gradient-gold">
                Nuestros Valores
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Excelencia:</strong> Calidad sin compromisos en cada proyecto
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Innovación:</strong> Siempre a la vanguardia tecnológica
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Transparencia:</strong> Comunicación clara y honesta
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Compromiso:</strong> Su éxito es nuestro objetivo
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;