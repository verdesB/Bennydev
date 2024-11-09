import Link from 'next/link';

export default function UpgradeCTA() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto text-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Vous souhaitez plus de fonctionnalités ?
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Nous pouvons partir de cette base et adapter le prix selon vos besoins spécifiques. 
          L'offre de départ évoluera en fonction des fonctionnalités demandées.
        </p>
        <Link 
          href="/contact" 
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Discutons de votre projet
        </Link>
      </div>
    </section>
  );
} 