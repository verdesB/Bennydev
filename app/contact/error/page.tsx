import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
        <p className="text-gray-600">Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.</p>
        <a href="/contact" className="mt-4 inline-block text-blue-600 hover:underline">Retour au formulaire</a>
      </div>
    </div>
  );
} 