import Hero2 from "@/app/components/Hero2";
import OffreDepart from "@/app/components/OffreDepart";
import TargetAudience from "@/app/components/TargetAudience";
import UpgradeCTA from "@/app/components/UpgradeCTA";
import { webappData } from "@/app/data/solutions/webapp";
import PricingTable from "@/app/components/PricingTable";
import { siteConfig } from "@/app/lib/site-config";
import TechnologyStack from "@/app/components/TechnologyStack";
import { webappTechnologies } from "@/app/data/technologies";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ChatButton from "@/app/components/ChatButton";

export default function WebApplication() {
  const audienceData = {
    title: "À qui s'adresse cette solution ?",
    audiences: [
      {
        text: "Les entreprises qui souhaitent digitaliser leurs processus internes et améliorer leur productivité.",
        highlight: "entreprises"
      },
      {
        text: "Les startups qui ont besoin d'une plateforme personnalisée pour lancer leur service en ligne.",
        highlight: "startups"
      },
      {
        text: "Les organisations qui veulent offrir des services spécifiques à leurs utilisateurs via une interface web.",
        highlight: "organisations"
      }
    ]
  };

  return (
    <>
    <Header pathname="/solutions" />
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2
        title="Application Web"
        subtitle="Une solution sur mesure pour digitaliser votre activité"
      />  

      <TargetAudience {...audienceData} />
      
      <OffreDepart {...webappData} />
      <PricingTable plans={siteConfig.services.webApp.pricing.plans} features={siteConfig.services.webApp.pricing.features} />
      <UpgradeCTA />
      <TechnologyStack technologies={webappTechnologies} />


    </main>
    <Footer />
    <ChatButton />
    </>
  );
} 