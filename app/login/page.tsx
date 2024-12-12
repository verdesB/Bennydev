'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Connexion
      const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Gestion spéciale pour l'erreur d'email non confirmé
        if (signInError.message.includes('Email not confirmed')) {
          // Renvoyer l'email de confirmation
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email: email,
            options: {
              emailRedirectTo: `${window.location.origin}/login`,
            },
          });

          if (resendError) throw resendError;
          
          throw new Error('Email non confirmé. Un nouveau lien de confirmation vous a été envoyé.');
        }
        throw signInError;
      }

      if (!session) throw new Error('Pas de session');

      console.log('Session utilisateur:', session.user);

      // 2. Vérifier si le profil existe
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*') // Sélectionnons tous les champs pour déboguer
        .eq('id', session.user.id)
        .single();

      console.log('Profil récupéré:', profile);
      console.log('Erreur profil:', profileError);

      if (profileError) throw profileError;

      if (!profile) {
        console.log('Création d\'un nouveau profil client');
        await supabase
          .from('profiles')
          .insert([{
            id: session.user.id,
            email: session.user.email,
            role: 'client'
          }]);
        router.push('/client');
        return;
      }

      console.log('Rôle détecté:', profile.role);

      // 4. Redirection basée sur le rôle
      if (profile.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/client');
      }

    } catch (err) {
      console.error('Erreur complète:', err);
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-screen relative flex items-center justify-center overflow-hidden">
      {/* Arrière-plan divisé en deux parties droites */}
      <div className="absolute inset-0 flex">
        {/* Partie gauche - Noir */}
        <div className="w-1/2 h-full bg-black"></div>
        {/* Partie droite - Violet */}
        <div className="w-1/2 h-full bg-purple-600"></div>
      </div>

      {/* Conteneur du formulaire de connexion */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Connexion</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </main>
  );
} 