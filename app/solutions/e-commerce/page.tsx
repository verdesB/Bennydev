import Header from "@/app/components/Header";
import Hero2 from "@/app/components/Hero2";
import OffreDepart from "@/app/components/OffreDepart";
import TargetAudience from "@/app/components/TargetAudience";

import UpgradeCTA from "@/app/components/UpgradeCTA";
import { ecommerceData } from "@/app/data/solutions/ecommerce";
import { ecommerceTechnologies } from "@/app/data/technologies";
import PricingTable from "@/app/components/PricingTable";
import TechnologyStack from "@/app/components/TechnologyStack";
import { pricingData } from "./ec.data";


export default function Ecommerce() {
  const audienceData = {
    title: "À qui s'adresse cette solution ?",
    audiences: [
      {
        text: "Notre solution e-commerce est idéale pour les commerçants qui souhaitent développer leur activité en ligne et toucher une clientèle plus large.",
        highlight: "commerçants"
      },
      {
        text: "Les créateurs et artisans qui veulent vendre leurs produits directement à leurs clients, sans intermédiaire.",
        highlight: "créateurs et artisans"
      },
      {
        text: "Les entreprises existantes qui cherchent à digitaliser leur activité et à créer un nouveau canal de vente.",
        highlight: "entreprises existantes"
      }
    ]
  };

  return (
    <>
    <Header pathname="/solutions"   />
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2
        title="E-commerce"
        subtitle="Une boutique en ligne performante pour développer votre activité"
      />  

      <TargetAudience {...audienceData} />
      
      <OffreDepart {...ecommerceData} />
      <PricingTable plans={pricingData.plans} features={pricingData.features} />
      <UpgradeCTA />
      <TechnologyStack technologies={ecommerceTechnologies} />

    </main>
    </>
  );
} 