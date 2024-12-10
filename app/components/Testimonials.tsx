import TestimonialCarousel from './TestimonialCarousel';
import Highlight from './Highlight';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Quentin Mousset",
      role: "CEO @Bedev & Administrator @HDM Network ASBL",
      content: <p>Benjamin est un <Highlight color="purple">super collaborateur</Highlight> Durant son stage au sein de notre ASBL, il a su se démarquer par <Highlight color="pink">sa motivation</Highlight>, sa <Highlight color="pink">détermination</Highlight> et son <Highlight color="pink">professionnalisme</Highlight>. Nous l'avons d'ailleurs sélectionné pour s'associer avec nous sur l'un de nos projets. Il a depuis repris les rênes du développement de cette application. Si nous engagions, il ne fait aucun doute qu'il aurait déjà rejoint notre équipe. Ben est un <Highlight color="purple">développeur talentueux</Highlight> avec une grande volonté d'apprendre et d'évoluer, un curieux dans l'âme que je recommande aux entreprises en recherche de <Highlight color="purple">ninja du code</Highlight>.</p>,
    },
    {
      name: "Membre Jury",
      role: "DREATS",
      content: <p>Ton <Highlight color="pink">enthousiasme</Highlight> et ton <Highlight color="pink">professionnalisme</Highlight> ont clairement marqué le jury. Ces qualités sont des atouts majeurs dans le monde professionnel, surtout dans le secteur du développement web et web mobile. Elles témoignent de ta capacité à <Highlight color="pink">t'engager pleinement dans tes projets</Highlight> et à <Highlight color="pink">travailler en équipe</Highlight>, des compétences très appréciées dans le milieu. Benjamin, tu as démontré une très <Highlight color="pink">belle personnalité</Highlight> et un gros <Highlight color="pink">potentiel</Highlight> lors de ta présentation. Le jury a été impressionné par ta démarche et ton parcours. Ta passion et ta détermination sont les clés de ton succès futur. Félicitations encore pour ton admission.</p>,
    },
    
  ];

  return (
    <section className="relative z-20 py-20">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-700 inline-block tracking-tight">
            Ils ont aimé ou choisi BennyDev
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Découvrez les retours d&apos;expérience de nos clients satisfaits
          </p>
        </div>

        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
} 