import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen pt-32 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Message envoyé avec succès !
        </h1>
        <p className="text-gray-600 mb-8">
          Nous vous répondrons dans les plus brefs délais.
        </p>
        <Link 
          href="/contact"
          className="inline-block px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Retour au formulaire
        </Link>
      </div>
    </main>
  );
} 