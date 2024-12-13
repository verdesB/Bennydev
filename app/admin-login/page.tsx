'use client';

import { useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { BackgroundBeams } from "../components/ui/background-beams";


export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const supabase = createClientComponentClient();
  const [challengeId, setChallengeId] = useState<string>('');
console.log(challengeId)
  const handleFirstStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (!session) throw new Error('Pas de session');

      // Vérifier si c'est bien un admin
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError) throw profileError;
      if (profile?.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Identifiants invalides');
      }
      // Vérifier si MFA est déjà configuré
      const { data, error: factorsError } = await supabase.auth.mfa.listFactors();
      const factors = data?.all;
      
      if (factorsError) throw factorsError;

      // Si MFA existe déjà, on démarre un challenge
      if (factors && factors.length > 0) {
        const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
          factorId: factors[0].id
        });
        
        if (challengeError) throw challengeError;
        setChallengeId(challengeData.id);
        setShowOTP(true);
      }

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: otpCode
        })
      });

      if (!response.ok) {
        throw new Error('Erreur d\'envoi du code');
      }

      // Stocker le code
      sessionStorage.setItem('tempOTP', otpCode);
      setLoading(false);
      setShowOTP(true);

    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
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

  const verifyOTP = async (code: string) => {
    if (loading) return;
    setError(null);
    setLoading(true);

    try {
      const storedOTP = sessionStorage.getItem('tempOTP');
      
      if (!storedOTP) {
        throw new Error('Session expirée');
      }

      if (code === storedOTP) {
        sessionStorage.removeItem('tempOTP');
        window.location.href = '/admin';
      } else {
        throw new Error('Code invalide');
      }

    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : 'Code invalide');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md p-6"
      >
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative bg-black/90 p-6 rounded-lg">
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg">
                {error}
              </div>
            )}

            {!showOTP ? (
              <form onSubmit={handleFirstStep} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Mot de passe"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium"
                >
                  {loading ? 'Vérification...' : 'Continuer'}
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
          </div>
        </div>
      </motion.div>
    </div>
  );
} 