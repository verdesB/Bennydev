import Hero2 from "@/app/components/Hero2";
import OffreDepart from "@/app/components/OffreDepart";
import TargetAudience from "@/app/components/TargetAudience";
import UpgradeCTA from "@/app/components/UpgradeCTA";
import { refonteData } from "@/app/data/solutions/refonte";

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
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2
        title="Refonte de Site Web"
        subtitle="Donnez un nouveau souffle à votre présence en ligne"
      />

      <TargetAudience {...audienceData} />
      
      <OffreDepart {...refonteData} />
      
      <UpgradeCTA />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-1" />
    </main>
  );
} 