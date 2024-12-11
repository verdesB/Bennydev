import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Message envoyé !</h1>
        <p className="text-gray-600">Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.</p>
        <a href="/contact" className="mt-4 inline-block text-blue-600 hover:underline">Retour au formulaire</a>
      </div>
    </div>
  );
} 