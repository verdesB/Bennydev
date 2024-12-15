'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SparklesCore } from '../components/ui/sparkles';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleFirstStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Vérifier d'abord si les identifiants existent sans créer de session
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Déconnecter immédiatement l'utilisateur
      await supabase.auth.signOut();

      // Générer et envoyer l'OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otpCode })
      });

      if (!response.ok) {
        throw new Error('Erreur d\'envoi du code');
      }

      // Stocker temporairement l'OTP et les identifiants
      sessionStorage.setItem('tempOTP', otpCode);
      sessionStorage.setItem('tempEmail', email);
      sessionStorage.setItem('tempPassword', password);
      setShowOTP(true);

    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (code: string) => {
    if (loading) return;
    setError(null);
    setLoading(true);

    try {
      const storedOTP = sessionStorage.getItem('tempOTP');
      const storedEmail = sessionStorage.getItem('tempEmail');
      const storedPassword = sessionStorage.getItem('tempPassword');
      
      if (!storedOTP || !storedEmail || !storedPassword) {
        throw new Error('Session expirée');
      }

      if (code === storedOTP) {
        // Si l'OTP est correct, on procède à la vraie connexion
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: storedEmail,
          password: storedPassword,
        });

        if (signInError) throw signInError;

        // Nettoyer le stockage temporaire
        sessionStorage.removeItem('tempOTP');
        sessionStorage.removeItem('tempEmail');
        sessionStorage.removeItem('tempPassword');

        // Rediriger vers la page client
        router.push('/client');
      } else {
        throw new Error('Code invalide');
      }

    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : 'Code invalide');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtpCode(value);
    
    if (value.length === 6) {
      verifyOTP(value);
    }
  };

  return (
    <div  className="min-h-screen w-full relative flex items-center justify-center bg-white antialiased bg-grid-white/[0.02] overflow-hidden p-4">
   
      
    <div className="min-h-screen w-full   bg-white antialiased bg-grid-white/[0.02] overflow-hidden">
      <Header pathname="/login" />
     
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col-reverse lg:flex-row-reverse max-w-6xl mx-auto mt-28 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-10 pb-10">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-transparent">
        <div className="absolute inset-0 h-96 -top-60 bg-purple-600/30 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 h-96 -top-60 bg-fuchsia-600/20 blur-[150px] rounded-full animate-pulse"></div>
      </div>
      <SparklesCore
      className="absolute inset-0 h-96 -top-60  rounded-full h-full"
      particleColor='#ffffff'
      particleSize={10}
      background='transparent'
      maxSize={1}
      minSize={0.5}
     
    
     

      />
      <h2 className="absolute left-10 top-10 text-3xl lg:text-6xl font-bold mb-8 text-white  text-left sm:text-center lg:text-left">
              Votre espace projet 
            </h2>
      
        {/* Section Gauche - Login */}
        <div className="w-full lg:w-1/2 flex items-center  justify-end sm:justify-center p-4 lg:p-8 mt-16">
        
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full sm:max-w-md"
          >
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              
              <div className="relative flex flex-col items-center space-y-6 bg-white/90 p-4 lg:p-8 rounded-3xl shadow-xl">
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
                {!showOTP ? (
                  <form onSubmit={handleFirstStep} className="w-full space-y-6">
                    {/* Email Input */}
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-gray/100 text-black rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none peer"
                        placeholder=" "
                        required
                      />
                      <label className="absolute text-sm text-gray-800 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 rounded-lg px-2 peer-placeholder-shown:px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
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
                      <label className="absolute text-sm text-gray-800 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 rounded-lg px-2 peer-placeholder-shown:px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
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
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={otpCode}
                        onChange={handleOTPInput}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Code de vérification"
                        maxLength={6}
                        required
                      />
                    </div>
                    {loading && (
                      <div className="text-center text-white">
                        Vérification en cours...
                      </div>
                    )}
                    {error && (
                      <div className="text-center text-red-500">
                        {error}
                      </div>
                    )}
                  </div>
                )}

                {/* Message d'inscription modifié */}
                <div className="text-gray-400 text-sm text-center">
                  <p className="mb-2">Vous souhaitez accéder au CRM ?</p>
                  <motion.a
                    href="/demarrer-un-projet"
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
            

            {/* Features */}
            <div className="space-y-6 mb-8 lg:mb-0 px-4 sm:px-6 lg:px-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <div className="p-3 bg-white rounded-lg shrink-0">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">Suivi en temps réel</h3>
                  <p className="text-sm lg:text-base text-white">Suivez l&apos;avancement de votre projet web et restez informé de chaque étape de développement.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <div className="p-3 bg-white rounded-lg shrink-0">
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">Communication simplifiée</h3>
                  <p className="text-sm lg:text-base text-white">Échangez directement sur les fonctionnalités, partagez vos retours et validez les étapes clés.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <div className="p-3 bg-white rounded-lg shrink-0">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">Gestion des tâches</h3>
                  <p className="text-sm lg:text-base text-white">Visualisez la liste des tâches en cours, les corrections à apporter et les futures évolutions.</p>
                </div>
              </motion.div>
            </div>

           
          </motion.div>
        </div>
         
      </div>
    <Footer />
    </div>
    </div>
     
       
  );
} 