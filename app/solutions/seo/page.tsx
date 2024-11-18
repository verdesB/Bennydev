import ChatButton from "@/app/components/ChatButton";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Hero2 from "@/app/components/Hero2";
import OffreDepart from "@/app/components/OffreDepart";
import TargetAudience from "@/app/components/TargetAudience";
import UpgradeCTA from "@/app/components/UpgradeCTA";
import { seoData } from "@/app/data/solutions/seo";

export default function SEO() {
  const audienceData = {
    title: "À qui s'adresse cette solution ?",
    audiences: [
      {
        text: "Les entreprises qui souhaitent améliorer leur visibilité sur les moteurs de recherche.",
        highlight: "entreprises"
      },
      {
        text: "Les e-commerces qui veulent augmenter leur trafic organique et leurs ventes.",
        highlight: "e-commerces"
      },
      {
        text: "Les organisations qui cherchent à optimiser leur présence en ligne.",
        highlight: "organisations"
      }
    ]
  };

  return (
    <>
    <Header pathname="/solutions" />
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2
        title="Solution SEO"
        subtitle="Optimisez votre référencement naturel"
      />

      <TargetAudience {...audienceData} />
      
      <OffreDepart {...seoData} />
      
      <UpgradeCTA />

    </main>
    <Footer />
    <ChatButton />
    </>
  );
} 