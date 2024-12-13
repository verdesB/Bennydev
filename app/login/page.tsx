'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { BackgroundBeams } from "../components/ui/background-beams";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <div  className="min-h-screen w-full relative flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden">
       <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
         {/* Effet de lumière ovale */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-transparent">
        <div className="absolute inset-0 h-96 -top-60 bg-purple-600/30 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 h-96 -top-60 bg-fuchsia-600/20 blur-[150px] rounded-full animate-pulse"></div>
      </div>
    <div className="min-h-screen w-full   bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden">
      <Header pathname="/login" />
     
      
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row max-w-6xl mx-auto mt-28">
        {/* Section Gauche - Login */}
        <div className="w-full lg:w-1/2 flex items-center  justify-end sm:justify-center p-4 lg:p-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full sm:max-w-md"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              
              <div className="relative flex flex-col items-center space-y-6 bg-black/90 p-4 lg:p-8 rounded-lg shadow-xl">
                {/* Logo animé */}
                <div className="w-full text-center mb-6 flex justify-start">
                  <TextGenerateEffect words="Connexion" className="text-3xl  tracking-tighter font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500" />
                </div>

                {/* Message d'erreur */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none peer"
                      placeholder=" "
                      required
                    />
                    <label className="absolute text-sm text-gray-400 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black/90 px-2 peer-placeholder-shown:px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      Email
                    </label>
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none peer"
                      placeholder=" "
                      required
                    />
                    <label className="absolute text-sm text-gray-400 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black/90 px-2 peer-placeholder-shown:px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      Mot de passe
                    </label>
                  </div>

                  {/* Bouton Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group"
                  >
                    <span className="relative w-full text-center text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                      {loading ? 'Connexion...' : 'Se connecter'}
                    </span>
                  </motion.button>
                </form>

                {/* Message d'inscription modifié */}
                <div className="text-gray-400 text-sm text-center">
                  <p className="mb-2">Vous souhaitez accéder au CRM ?</p>
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-md text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Démarrer un projet →
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section Droite - Présentation */}
        <div className="w-full lg:w-1/2 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full flex flex-col justify-center p-4 lg:p-12 text-white max-w-xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-left sm:text-center lg:text-left">
              Votre espace projet 
            </h2>

            {/* Features */}
            <div className="space-y-6 mb-8 lg:mb-0 px-4 sm:px-6 lg:px-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <div className="p-3 bg-purple-500/10 rounded-lg shrink-0">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">Suivi en temps réel</h3>
                  <p className="text-sm lg:text-base text-gray-400">Suivez l'avancement de votre projet web et restez informé de chaque étape de développement.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <div className="p-3 bg-pink-500/10 rounded-lg shrink-0">
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">Communication simplifiée</h3>
                  <p className="text-sm lg:text-base text-gray-400">Échangez directement sur les fonctionnalités, partagez vos retours et validez les étapes clés.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <div className="p-3 bg-purple-500/10 rounded-lg shrink-0">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">Gestion des tâches</h3>
                  <p className="text-sm lg:text-base text-gray-400">Visualisez la liste des tâches en cours, les corrections à apporter et les futures évolutions.</p>
                </div>
              </motion.div>
            </div>

            {/* Call to action */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 lg:mt-12 p-4 lg:p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 mx-4 sm:mx-6 lg:mx-0"
            >
              <h4 className="text-lg lg:text-xl font-semibold mb-2">Vous avez un projet web ?</h4>
              <p className="text-sm lg:text-base text-gray-400 mb-4">Contactez-moi pour discuter de votre projet et obtenir un accès à votre espace personnel de suivi.</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-white"
                onClick={() => window.location.href = '/contact'}
              >
                Démarrer la discussion →
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
         
      </div>
    <Footer />
    </div>
    </div>
     
       
  );
} 