import Hero2 from "@/app/components/Hero2";
import TargetAudience from "@/app/components/TargetAudience";
import OffreDepart from "@/app/components/OffreDepart";
import UpgradeCTA from "@/app/components/UpgradeCTA";
import { sitesVitrinesData } from "@/app/data/solutions/sitesVitrines";
import PricingTable from "@/app/components/PricingTable";
import { pricingData } from "./site.data";
import Header from "@/app/components/Header";
import { vitrinesTechnologies } from "@/app/data/technologies";
import TechnologyStack from "@/app/components/TechnologyStack";

export default function SitesVitrines() {
  const audienceData = {
    title: "À qui s'adresse cette solution ?",
    audiences: [
      {
        text: "Notre solution de sites vitrines est parfaitement adaptée aux petites entreprises qui souhaitent établir leur présence en ligne de manière professionnelle.",
        highlight: "petites entreprises"
      },
      {
        text: "Elle convient particulièrement aux artisans et indépendants désireux de mettre en valeur leur savoir-faire et leurs réalisations.",
        highlight: "artisans et indépendants"
      },
      {
        text: "Les professions libérales y trouveront également leur compte pour renforcer leur crédibilité et faciliter la prise de contact avec leurs clients.",
        highlight: "professions libérales"
      }
    ]
  };

  return (
    <>
    <Header pathname="/solutions" />
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2
        title="Sites Vitrines"
        subtitle="Des sites vitrines sur mesure pour votre entreprise"
      />  

      <TargetAudience {...audienceData} />
      
      <OffreDepart {...sitesVitrinesData} />
      
      
      <PricingTable plans={pricingData.plans} features={pricingData.features} />
     <UpgradeCTA />
     <TechnologyStack technologies={vitrinesTechnologies} />
    </main>
    </>
  );
}

