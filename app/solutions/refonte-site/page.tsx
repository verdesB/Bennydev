import Hero2 from "@/app/components/Hero2";
import OffreDepart from "@/app/components/OffreDepart";
import PricingTable from "@/app/components/PricingTable";
import TargetAudience from "@/app/components/TargetAudience";
import UpgradeCTA from "@/app/components/UpgradeCTA";
import { refonteData } from "@/app/data/solutions/refonte";
import { pricingData } from "./rf.data";
import Header from "@/app/components/Header";

export default function Refonte() {
  const audienceData = {
    title: "À qui s'adresse cette solution ?",
    audiences: [
      {
        text: "Les entreprises qui souhaitent moderniser leur site web obsolète ou peu performant.",
        highlight: "entreprises"
      },
      {
        text: "Les organisations qui veulent améliorer leur présence en ligne et leur image de marque.",
        highlight: "organisations"
      },
      {
        text: "Les e-commerces qui cherchent à optimiser leurs performances et leurs conversions.",
        highlight: "e-commerces"
      }
    ]
  };

  return (
    <>
    <Header pathname="/solutions" />
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2
        title="Refonte de Site Web"
        subtitle="Donnez un nouveau souffle à votre présence en ligne"
      />

      <TargetAudience {...audienceData} />
      
      <OffreDepart {...refonteData} />
      <PricingTable plans={pricingData.plans} features={pricingData.features} />
      
      <UpgradeCTA />

    </main>
    </>
  );
} 