import Hero2 from "@/app/components/Hero2";
import OffreDepart from "@/app/components/OffreDepart";
import TargetAudience from "@/app/components/TargetAudience";
import UpgradeCTA from "@/app/components/UpgradeCTA";
import { apiData } from "@/app/data/solutions/api";

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
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2
        title="Solution API"
        subtitle="Connectez vos systèmes efficacement"
      />

      <TargetAudience {...audienceData} />
      
      <OffreDepart {...apiData} />
      
      <UpgradeCTA />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-1" />
    </main>
  );
} 