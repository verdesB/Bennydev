'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import { Calendar, FileText, Mail, XCircle, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

interface FileObject {
    name: string
    created_at: string
    id: string
    size: number
    content?: string
}

// Ajout des interfaces
interface UserFormData {
    displayName: string;
    email: string;
    password: string;
    phone: string;
}

interface ProfileFormData {
    firstName: string;
    lastName: string;
    company: string;
    projectCode: string;
    role: 'client';
}

interface ProjectFormData {
    name: string;
    description: string;
    type: string;
    state: string;
    starterDate: string;
    focusDate: string;
    budget: number;
    projectCode: string;
}

interface UserResponse {
    user: {
        displayName: string;
        email: string;
        phone: string;
    };
    profile: {
        firstName: string;
        lastName: string;
        company: string;
        projectCode: string;
    };
    project: {
        name: string;
        description: string;
        type: string;
        state: string;
        starterDate: string;
        focusDate: string;
        budget: number;
    };
}

interface Params {
    id: string;
}

interface PageProps {
    params: Params;
    searchParams: { [key: string]: string | string[] | undefined };
}

const DemandeDetail = ({ params }: PageProps) => {
    const [file, setFile] = useState<FileObject | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState('')
    const [sending, setSending] = useState(false)

    // Nouveaux states pour les formulaires
    const [userForm, setUserForm] = useState<UserFormData>({
        displayName: '',
        email: '',
        password: '',
        phone: ''
    });
    
    const [profileForm, setProfileForm] = useState<ProfileFormData>({
        firstName: '',
        lastName: '',
        company: '',
        projectCode: '',
        role: 'client'
    });
    
    const [projectForm, setProjectForm] = useState<ProjectFormData>({
        name: '',
        description: '',
        type: '',
        state: 'draft',
        starterDate: '',
        focusDate: '',
        budget: 0,
        projectCode: ''
    });

    // Ajout des states pour suivre la progression
    const [step, setStep] = useState<'user' | 'profile' | 'project'>('user');
    const [isUserValid, setIsUserValid] = useState(false);
    const [isProfileValid, setIsProfileValid] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [existingUser, setExistingUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        const fetchFile = async () => {
            try {
                // Récupérer tous les fichiers
                const response = await fetch('/api/demande')
                const data = await response.json()
                
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des fichiers')
                }

                // Vérifier que data.files existe et est un tableau
                const files = Array.isArray(data) ? data : data.files

                if (!Array.isArray(files)) {
                    throw new Error('Format de données invalide')
                }

                // Trouver le fichier qui correspond à l'ID
                const matchingFile = files.find((file: FileObject) => {
                    const fileId = file.name.slice(-7, -3)
                    return fileId === params.id
                })

                if (!matchingFile) {
                    throw new Error('Fichier non trouvé')
                }

                // Récupérer le contenu du fichier
                const contentResponse = await fetch(`/api/demande/${matchingFile.name}`)
                const contentData = await contentResponse.json()
                
                if (!contentResponse.ok) {
                    throw new Error('Erreur lors de la récupération du contenu')
                }

                // Mettre à jour le fichier avec son contenu
                setFile({
                    ...matchingFile,
                    content: contentData.content
                })
            } catch (error) {
                console.error('Erreur complète:', error)
                setError(error instanceof Error ? error.message : 'Erreur inconnue')
            } finally {
                setLoading(false)
            }
        }

        fetchFile()
    }, [params.id])

    useEffect(() => {
        const checkExistingUser = async () => {
            try {
                const projectCode = file?.name.slice(-7, -3);
                if (!projectCode) return;

                const response = await fetch('/api/check-existing-user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ projectCode })
                });

                const { data, error } = await response.json();
                console.log("Données reçues côté client:", data);

                if (error) throw new Error(error);
                setExistingUser(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (file) {
            checkExistingUser();
        }
    }, [file]);

    const handleSendEmail = async () => {
        if (!email) {
            toast.error("Veuillez entrer une adresse email")
            return
        }

        setSending(true)

        try {
            const response = await fetch('/api/send-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    fileId: file?.name.slice(-7, -3), // Utiliser les 4 derniers caractères avant .md
                    fileName: file?.name
                })
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Erreur lors de l\'envoi')
            }

            toast.success("Lien d'inscription envoyé !")
            setEmail('')
        } catch (error) {
            console.error('Erreur:', error)
            toast.error(error instanceof Error ? error.message : 'Erreur lors de l\'envoi')
        } finally {
            setSending(false)
        }
    }

    // Nouvelle fonction de soumission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Soumission du formulaire");

        if (step !== 'project' || !isUserValid || !isProfileValid) {
            return;
        }

        try {
            const response = await fetch('/api/create-user-profile-project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    user: userForm,
                    profile: profileForm,
                    project: projectForm
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de la création');
            }

            setSubmissionSuccess(true);
            toast.success('Utilisateur, profil et projet créés avec succès!');

        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Erreur lors de la création');
            console.error(error);
        }
    };

    // Fonctions de validation par étape
    const handleUserSubmit = () => {
        // Validation des champs utilisateur
        if (userForm.displayName && userForm.email && userForm.password && userForm.phone) {
            setIsUserValid(true);
            setStep('profile');
            toast.success('Informations utilisateur validées');
        } else {
            toast.error('Veuillez remplir tous les champs utilisateur');
        }
    };

    const handleProfileSubmit = () => {
        // Validation des champs profil
        if (profileForm.firstName && profileForm.lastName && profileForm.company && profileForm.projectCode) {
            setIsProfileValid(true);
            setStep('project');
            toast.success('Informations profil validées');
        } else {
            toast.error('Veuillez remplir tous les champs profil');
        }
    };



    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                    <div className="mt-4 text-muted-foreground text-sm">Chargement...</div>
                </div>
            </div>
        )
    }

    if (error || !file) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20 text-center">
                    <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                    <p className="font-semibold text-destructive">Erreur: {error || 'Demande non trouvée'}</p>
                </div>
            </div>
        )
    }

    if (existingUser) {
        return (
            <div className="container mr-auto p-4 h-[calc(100vh-80px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    {/* Colonne de gauche - Description */}
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="mb-2">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Demande de projet n°{file.name.slice(-7, -3)}
                            </h1>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {new Date(file.created_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <FileText className="h-4 w-4" />
                                    <span>{(file.size / 1024).toFixed(2)} KB</span>
                                </div>
                            </div>
                        </div>

                        <Card className="flex-1 overflow-auto">
                            <div className="p-4">
                                <ReactMarkdown 
                                    className="prose prose-sm dark:prose-invert max-w-none
                                        prose-headings:font-bold 
                                        prose-h1:text-lg 
                                        prose-h2:text-base 
                                        prose-h3:text-sm
                                        prose-p:my-1
                                        prose-ul:my-1
                                        prose-ul:pl-4
                                        prose-li:my-0
                                        prose-strong:text-primary"
                                >
                                    {file.content || 'Aucun contenu disponible'}
                                </ReactMarkdown>
                            </div>
                        </Card>
                    </div>

                    {/* Colonne de droite - Information utilisateur existant */}
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="mb-2">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Détails du compte client
                            </h1>
                        </div>

                        <Card className="flex-1 overflow-auto">
                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold">Informations Utilisateur</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Nom d&apos;affichage</Label>
                                            <p className="mt-1">{existingUser.user.displayName || 'Non défini'}</p>
                                        </div>
                                        <div>
                                            <Label>Email</Label>
                                            <p className="mt-1">{existingUser.user.email}</p>
                                        </div>
                                        <div>
                                            <Label>Téléphone</Label>
                                            <p className="mt-1">{existingUser.user.phone || 'Non défini'}</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold">Profil</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Prénom</Label>
                                            <p className="mt-1">{existingUser.profile.firstName}</p>
                                        </div>
                                        <div>
                                            <Label>Nom</Label>
                                            <p className="mt-1">{existingUser.profile.lastName}</p>
                                        </div>
                                        <div>
                                            <Label>Entreprise</Label>
                                            <p className="mt-1">{existingUser.profile.company}</p>
                                        </div>
                                        <div>
                                            <Label>Code projet</Label>
                                            <p className="mt-1">{existingUser.profile.projectCode}</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold">Projet</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Nom du projet</Label>
                                            <p className="mt-1">{existingUser.project.name}</p>
                                        </div>
                                        <div>
                                            <Label>Type</Label>
                                            <p className="mt-1">{existingUser.project.type}</p>
                                        </div>
                                        <div>
                                            <Label>État</Label>
                                            <p className="mt-1">{existingUser.project.state}</p>
                                        </div>
                                        <div>
                                            <Label>Budget</Label>
                                            <p className="mt-1">{existingUser.project.budget}€</p>
                                        </div>
                                        <div className="col-span-2">
                                            <Label>Description</Label>
                                            <p className="mt-1">{existingUser.project.description}</p>
                                        </div>
                                        <div>
                                            <Label>Date de début</Label>
                                            <p className="mt-1">{new Date(existingUser.project.starterDate).toLocaleDateString('fr-FR')}</p>
                                        </div>
                                        <div>
                                            <Label>Date de fin</Label>
                                            <p className="mt-1">{new Date(existingUser.project.focusDate).toLocaleDateString('fr-FR')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mr-auto p-4 h-[calc(100vh-80px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {/* Colonne de gauche - Description */}
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex-shrink-0 mb-4">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Demande #{file.name.slice(-7, -3)}
                        </h1>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1 rounded-full">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(file.created_at).toLocaleDateString('fr-FR')}</span>
                            </div>
                            <Badge variant="secondary" className="rounded-full">
                                En attente
                            </Badge>
                        </div>
                    </div>

                    <Card className="flex-1 overflow-auto">
                        <div className="p-4">
                            <ReactMarkdown 
                                className="prose prose-sm dark:prose-invert max-w-none
                                    prose-headings:font-bold 
                                    prose-h1:text-lg 
                                    prose-h2:text-base 
                                    prose-p:text-muted-foreground
                                    prose-p:leading-relaxed
                                    prose-ul:my-2
                                    prose-li:text-muted-foreground
                                    prose-strong:text-primary"
                            >
                                {file.content || 'Aucun contenu disponible'}
                            </ReactMarkdown>
                        </div>
                    </Card>
                </div>

                {/* Colonne de droite - Formulaire */}
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex-shrink-0 mb-4">
                        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary/60 bg-clip-text text-transparent">
                            {submissionSuccess ? 'Détails du compte' : 'Création du compte'}
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            {submissionSuccess 
                                ? 'Le compte a été créé avec succès' 
                                : 'Remplissez les informations pour créer le compte client'}
                        </p>
                    </div>

                    <Card className="flex-1 overflow-auto">
                        <div className="p-4">
                            {/* Étapes de progression */}
                            <div className="flex-shrink-0 mb-6">
                                <div className="flex justify-between relative">
                                    {['user', 'profile', 'project'].map((stepName, index) => (
                                        <div key={stepName} className="flex flex-col items-center relative z-10">
                                            <div className={`
                                                w-8 h-8 rounded-full flex items-center justify-center text-sm
                                                ${step === stepName ? 'bg-primary text-primary-foreground' :
                                                index < ['user', 'profile', 'project'].indexOf(step) ? 'bg-primary/20 text-primary' :
                                                'bg-muted text-muted-foreground'}
                                            `}>
                                                {index + 1}
                                            </div>
                                            <span className="text-xs mt-1 text-muted-foreground capitalize">
                                                {stepName}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="absolute top-4 left-0 w-full h-[2px] bg-muted -z-0">
                                        <div className={`h-full bg-primary transition-all duration-300
                                            ${step === 'user' ? 'w-0' : 
                                              step === 'profile' ? 'w-1/2' : 
                                              'w-full'}
                                        `}/>
                                    </div>
                                </div>
                            </div>

                            {/* Formulaire */}
                            <div className="space-y-6 overflow-auto">
                                {step === 'user' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="displayName">Nom d&apos;affichage</Label>
                                                <Input
                                                    id="displayName"
                                                    value={userForm.displayName}
                                                    onChange={(e) => setUserForm({...userForm, displayName: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={userForm.email}
                                                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="password">Mot de passe</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    value={userForm.password}
                                                    onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Téléphone</Label>
                                                <Input
                                                    id="phone"
                                                    value={userForm.phone}
                                                    onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                        </div>
                                        <Button 
                                            onClick={handleUserSubmit}
                                            className="w-full rounded-full mt-4"
                                        >
                                            Suivant
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                )}

                                {step === 'profile' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">Prénom</Label>
                                                <Input
                                                    id="firstName"
                                                    value={profileForm.firstName}
                                                    onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Nom</Label>
                                                <Input
                                                    id="lastName"
                                                    value={profileForm.lastName}
                                                    onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="company">Entreprise</Label>
                                                <Input
                                                    id="company"
                                                    value={profileForm.company}
                                                    onChange={(e) => setProfileForm({...profileForm, company: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="projectCode">Code projet</Label>
                                                <Input
                                                    id="projectCode"
                                                    value={profileForm.projectCode}
                                                    onChange={(e) => setProfileForm({...profileForm, projectCode: e.target.value})}
                                                    className="bg-background"
                                                    
                                                />
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <Button 
                                                variant="outline"
                                                onClick={() => setStep('user')}
                                                className="flex-1 rounded-full"
                                            >
                                                <ChevronLeft className="mr-2 h-4 w-4" />
                                                Retour
                                            </Button>
                                            <Button 
                                                onClick={handleProfileSubmit}
                                                className="flex-1 rounded-full"
                                            >
                                                Suivant
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {step === 'project' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2 space-y-2">
                                                <Label htmlFor="projectName">Nom du projet</Label>
                                                <Input
                                                    id="projectName"
                                                    value={projectForm.name}
                                                    onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    value={projectForm.description}
                                                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                                                    className="bg-background resize-none h-24"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="type">Type</Label>
                                                <Input
                                                    id="type"
                                                    value={projectForm.type}
                                                    onChange={(e) => setProjectForm({...projectForm, type: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="budget">Budget</Label>
                                                <Input
                                                    id="budget"
                                                    type="number"
                                                    value={projectForm.budget}
                                                    onChange={(e) => setProjectForm({...projectForm, budget: Number(e.target.value)})}
                                                    className="bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="starterDate">Date de début</Label>
                                                <Input
                                                    id="starterDate"
                                                    type="date"
                                                    value={projectForm.starterDate}
                                                    onChange={(e) => setProjectForm({...projectForm, starterDate: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="focusDate">Date de fin</Label>
                                                <Input
                                                    id="focusDate"
                                                    type="date"
                                                    value={projectForm.focusDate}
                                                    onChange={(e) => setProjectForm({...projectForm, focusDate: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="projectCode">Code du projet</Label>
                                                <Input
                                                    id="projectCode"
                                                    value={projectForm.projectCode}
                                                    onChange={(e) => setProjectForm({...projectForm, projectCode: e.target.value})}
                                                    className="bg-background"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <Button 
                                                variant="outline"
                                                onClick={() => setStep('profile')}
                                                className="flex-1 rounded-full"
                                            >
                                                <ChevronLeft className="mr-2 h-4 w-4" />
                                                Retour
                                            </Button>
                                            <Button 
                                                onClick={handleSubmit}
                                                className="flex-1 rounded-full"
                                                disabled={!isUserValid || !isProfileValid}
                                            >
                                                Créer le compte
                                                <Check className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Section Email (toujours visible en bas) */}
                            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                                <div className="flex space-x-2">
                                    <Input
                                        type="email"
                                        placeholder="Adresse email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button 
                                        onClick={handleSendEmail} 
                                        disabled={sending}
                                        className="rounded-full px-4"
                                    >
                                        {sending ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent"/>
                                        ) : (
                                            <>
                                                <Mail className="mr-2 h-4 w-4" />
                                                Envoyer
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DemandeDetail 