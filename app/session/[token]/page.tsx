'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/app/lib/supabase'

export default function SessionPage() {
    const params = useParams()
    const token = params.token as string
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [signupError, setSignupError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [step, setStep] = useState('verify')
    const [email, setEmail] = useState('')
    const [tempPassword, setTempPassword] = useState('')

    useEffect(() => {
        const validateSession = async () => {
            try {
                const response = await fetch(`/api/validate-session/${token}`)
                const result = await response.json()

                if (!response.ok) {
                    throw new Error(result.error || 'Session invalide')
                }

                if (!result.data) {
                    throw new Error('Données de session manquantes')
                }
                
                // Supprimer sessionData si non utilisé
            } catch (error) {
                setError(error instanceof Error ? error.message : "Erreur lors de la validation de la session")
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            validateSession()
        }
    }, [token])

    const validatePassword = () => {
        if (newPassword.length < 6) {
            setSignupError('Le mot de passe doit contenir au moins 6 caractères')
            return false
        }
        if (newPassword !== confirmPassword) {
            setSignupError('Les mots de passe ne correspondent pas')
            return false
        }
        return true
    }

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault()
        setSignupError(null)
        setIsSubmitting(true)

        try {
            // Vérifier les identifiants temporaires
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: tempPassword
            })

            if (error) {
                throw new Error('Email ou code projet invalide')
            }

            // Si la connexion réussit, passer à l'étape suivante
            setStep('change')
        } catch (error) {
            setSignupError(error instanceof Error ? error.message : 'Erreur de vérification')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSignupError(null)
        
        // Validation du mot de passe
        if (!validatePassword()) {
            return
        }

        setIsSubmitting(true)

        try {
            // 1. Mise à jour du mot de passe
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword
            })

            if (updateError) throw updateError

            // 2. Redirection vers la page de connexion
            window.location.href = '/login?message=password_updated'

        } catch (error) {
            console.error('Erreur mise à jour:', error)
            setSignupError(error instanceof Error ? error.message : 'Erreur lors de la mise à jour du mot de passe')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Chargement...</div>
    }

    if (error) {
        return (
            <Card className="max-w-2xl mx-auto mt-8 p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
                    <p className="text-gray-600">{error}</p>
                </div>
            </Card>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 relative z-30">
            <Card className="max-w-md mx-auto p-6">
                {step === 'verify' ? (
                    // Étape 1 : Vérification du code projet
                    <div className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold mb-2">Vérification</h1>
                            <p className="text-gray-600">
                                Veuillez saisir votre email et le code projet fourni
                            </p>
                        </div>

                        <form onSubmit={handleVerification} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="tempPassword" className="block text-sm font-medium">
                                    Code Projet
                                </label>
                                <Input
                                    id="tempPassword"
                                    type="password"
                                    value={tempPassword}
                                    onChange={(e) => setTempPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {signupError && (
                                <div className="text-red-600 text-sm text-center">
                                    {signupError}
                                </div>
                            )}

                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Vérification...' : 'Vérifier'}
                            </Button>
                        </form>
                    </div>
                ) : (
                    // Étape 2 : Création du nouveau mot de passe
                    <div className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold mb-2">Créez votre nouveau mot de passe</h1>
                            <p className="text-gray-600">
                                Pour l'adresse email : {email}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="newPassword" className="block text-sm font-medium">
                                    Nouveau mot de passe
                                </label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="Minimum 6 caractères"
                                />
                                <p className="text-xs text-gray-500">
                                    Le mot de passe doit contenir au moins 6 caractères
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                                    Confirmez le nouveau mot de passe
                                </label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="Retapez votre nouveau mot de passe"
                                />
                            </div>

                            {signupError && (
                                <div className="text-red-600 text-sm text-center">
                                    {signupError}
                                </div>
                            )}

                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
                            </Button>
                        </form>
                    </div>
                )}
            </Card>
        </div>
    )
} 