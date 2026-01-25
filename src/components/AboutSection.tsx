import { Award, Users, TrendingUp, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Award, value: "10+", label: t("about.years") },
    { icon: Users, value: "50+", label: t("about.experts") },
    { icon: TrendingUp, value: "95%", label: t("about.satisfaction") },
    { icon: Globe, value: "15+", label: t("about.countries") },
  ];

  return (
    <section id="nosotros" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-gold">{t("about.leaders")}</span> en
              <br />
              <span className="text-futuristic-gold">{t("about.innovation")}</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              {t("about.description1")}
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              {t("about.description2")}
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
                {t("about.mission")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("about.mission_text")}
              </p>
              
              <h3 className="text-2xl font-serif font-semibold mb-6 text-gradient-gold">
                {t("about.values")}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{t("about.excellence")}</strong> {t("about.excellence_text")}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{t("about.innovation_value")}</strong> {t("about.innovation_text")}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{t("about.transparency")}</strong> {t("about.transparency_text")}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{t("about.commitment")}</strong> {t("about.commitment_text")}
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
