import Hero2 from "@/app/components/Hero2";
import OffreDepart from "@/app/components/OffreDepart";
import TargetAudience from "@/app/components/TargetAudience";
import UpgradeCTA from "@/app/components/UpgradeCTA";
import PricingTable from "@/app/components/PricingTable";
import { apiData } from "@/app/data/solutions/api";
import { pricingData } from "./api.data";
import Header from "@/app/components/Header";
import TechnologyStack from "@/app/components/TechnologyStack";
import { apiTechnologies, Technology } from "@/app/data/technologies";

export default function API() {
  const audienceData = {
    title: "À qui s'adresse cette solution ?",
    audiences: [
      {
        text: "Les entreprises qui souhaitent interconnecter leurs différents systèmes et applications.",
        highlight: "entreprises"
      },
      {
        text: "Les startups qui ont besoin d'exposer leurs services via une API robuste.",
        highlight: "startups"
      },
      {
        text: "Les organisations qui veulent automatiser leurs processus métier.",
        highlight: "organisations"
      }
    ]
  };

  return (
    <>
    <Header pathname="/solutions" />
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2
        title="Solution API"
        subtitle="Connectez vos systèmes efficacement"
      />

      <TargetAudience {...audienceData} />
      
      <OffreDepart {...apiData} />
      
      <PricingTable plans={pricingData.plans} features={pricingData.features} />
      
      <UpgradeCTA />
      
      <TechnologyStack technologies={apiTechnologies as Technology[]} />

    </main>
    </>
  );
} 