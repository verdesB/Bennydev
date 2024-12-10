import Image from 'next/image';

export default function About() {
  

  return (
    <section className="relative z-20 py-20 ">
      <div className="absolute inset-0 bg-[linear-radient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-700 inline-block tracking-tight ">
            À Propos de BennyDev
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/Bennydev.webp"
                alt="BennyDev workspace"
                fill
                sizes="(max-width: 768px) 400px, 400px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent" />
            </div>
            <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden mb-4">
                <Image
                  src="/moi.webp" // Ajoutez votre photo de profil
                  alt="Benjamin Verdès"
                 
                  width={150}
                  height={150}
                  sizes="(max-width: 768px) 150px, 150px"
                  // Utilisation de style
                  className="object-cover"
                />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center w-64">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Verdès Benjamin
                </h3>
                <p className="text-purple-600 font-medium text-sm mb-2">
                  Développeur Web Full Stack
                </p>
                <p className="text-gray-600 text-sm">
                  Passionné par le développement web et l&apos;expérience utilisateur
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6 mt-16 lg:mt-0">
            <p className="text-gray-700 leading-relaxed">
            En tant que créateur de BennyDev, je fais plus que développer des solutions digitales , je construis de véritables partenariats avec les entrepreneurs ambitieux. Ma mission ? Rendre le digital accessible aux petites entreprises grâce à des tarifs adaptés et un accompagnement personnalisé. Du site vitrine à l&apos;e-commerce, en passant par les applications web et le référencement SEO, je mets mon expertise technique au service de votre croissance.
            </p>
            <div className="border-l-4 border-purple-600 pl-4 my-8">
              <p className="text-gray-900 font-medium italic">
                &quot;Ma mission est d&apos;accompagner mes clients dans la réalisation de leurs projets web, de la conception à la livraison, et au-delà.&quot;
              </p>
            </div>
          </div>
        </div>
        <div className="mt-48  flex flex-col items-center gap-8">
          <h3 className="mb-12 text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-700 inline-block tracking-tight  mx-auto ">
            Mes Valeurs
          </h3>
          
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            {/* Première rangée */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Card 1 */}
                <div className="w-full md:w-[50%] lg:w-[65%] relative rounded-3xl p-8 shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden
                  bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-purple-900 to-pink-800
                  before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:via-transparent before:to-pink-600/10
                  after:absolute after:inset-0 after:backdrop-blur-[100px] after:z-0">
                  <div className="absolute -right-8 -top-8 z-20">
                    <svg className="w-32 h-32 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight h-24">
                      L&apos;Humain au Cœur de Chaque Projet
                    </h4>
                    <p className="text-white/90 text-base leading-relaxed my-auto">
                      Au-delà de la technique, je crois profondément en l&apos;importance des relations humaines dans chaque projet. Mon approche personnalisée me permet de vraiment comprendre vos besoins, vos aspirations et vos contraintes. Je ne suis pas qu&apos;un simple prestataire, mais un véritable partenaire qui s&apos;investit dans votre réussite.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="w-full md:w-[50%] lg:w-[35%] relative rounded-3xl p-8 shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden
                  bg-[linear-gradient(110deg,_var(--tw-gradient-stops))] from-gray-800 via-purple-800 to-pink-700
                  before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/5 before:to-transparent
                  after:absolute after:inset-0 after:backdrop-blur-[100px] after:z-0">
                  <div className="absolute -right-8 -top-8 z-20">
                    <svg className="w-32 h-32 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">
                      Une Transparence Absolue
                    </h4>
                    <p className="text-white/90 text-base leading-relaxed">
                      La confiance se construit sur la transparence. C&apos;est pourquoi j&apos;ai mis en place un système CRM innovant qui vous permet de suivre l&apos;avancement de votre projet en temps réel. Chaque étape, chaque décision, chaque progrès est partagé avec vous, comme si vous aviez votre propre développeur en interne.
                    </p>
                  </div>
                </div>
            </div>

            {/* Deuxième rangée */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Card 3 */}
                <div className="w-full md:w-[50%] lg:w-[35%] relative rounded-3xl p-8 shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden
                  bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-pink-800
                  before:absolute before:inset-0 before:bg-gradient-to-bl before:from-white/5 before:via-purple-500/10 before:to-transparent
                  after:absolute after:inset-0 after:backdrop-blur-[100px] after:z-0">
                  <div className="absolute -right-8 -top-8 z-20">
                    <svg className="w-32 h-32 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">
                      Des Solutions Accessibles
                    </h4>
                    <p className="text-white/90 text-base leading-relaxed">
                      Je comprends les défis financiers auxquels font face les petites entreprises aujourd&apos;hui. C&apos;est pourquoi je propose des tarifs adaptés qui rendent le développement web professionnel accessible sans compromettre la qualité.
                    </p>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="w-full md:w-[50%] lg:w-[65%] relative rounded-3xl p-8 shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden
                  bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gray-900 via-purple-800 to-pink-800
                  before:absolute before:inset-0 before:bg-[linear-gradient(40deg,rgba(139,92,246,0.05),transparent_30%,rgba(219,39,119,0.05))]
                  after:absolute after:inset-0 after:backdrop-blur-[100px] after:z-0">
                  <div className="absolute -right-8 -top-8 z-20">
                    <svg className="w-32 h-32 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold text-white mb-4 tracking-tight h-16">
                      Un Engagement sur le Long Terme
                    </h4>
                    <p className="text-white/90 text-base leading-relaxed">
                      Votre succès digital ne s&apos;arrête pas au lancement de votre projet. Je reste à vos côtés pour faire évoluer vos solutions, résoudre les problèmes techniques et vous conseiller dans votre développement numérique. Cette vision long terme garantit que vos outils digitaux continuent de servir efficacement votre croissance au fil du temps.
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-20 bg-white rounded-2xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.1)] bg-gradient-to-bl from-gray-100 to-white border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
            Mon Histoire
          </h3>
          <div className="prose prose-purple max-w-none text-gray-700">
            <p className="mb-4">
              Après avoir exploré plusieurs domaines professionnels, de l&apos;ébénisterie à l&apos;hôtellerie-restauration, j&apos;ai rejoint l&apos;entreprise BEDEV en 2023 où j&apos;ai travaillé sur d&apos;importants projets d&apos;applications web.
            </p>
            <p className="mb-4">
              En 2024, guidé par mon désir d&apos;avoir un contact direct avec les clients, j&apos;ai créé BennyDev, ma propre micro-entreprise de développement web
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
} 