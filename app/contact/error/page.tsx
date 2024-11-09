import Link from 'next/link';

export default function ErrorPage() {
  return (
    <main className="min-h-screen pt-32 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Une erreur est survenue
        </h1>
        <p className="text-gray-600 mb-8">
          Désolé, nous n&apos;avons pas pu envoyer votre message. Veuillez réessayer.
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