import { TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import ReactMarkdown from 'react-markdown'
import { Calendar, FileText} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"

import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"


interface DemandeContentProps {
    file: {
        id: string
        name: string
        content?: string
        created_at: string
        size: number
        projectCode?: string
    }
    expandedFiles: Set<string>
    toggleExpand: (fileId: string) => void
    markFileAsViewed: (fileId: string) => void
    takenRequests: Set<string>
}

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

const formatDateToISO = (dateStr: string) => {
    if (!dateStr) return null; // Retourne null si pas de date
    
    try {
        const [day, month, year] = dateStr.split('/');
        
        // Gestion de l'année sur 2 ou 4 chiffres
        let fullYear = year;
        if (year.length === 2) {
            fullYear = `20${year}`;
        }
        
        // Padding avec des zéros si nécessaire
        const paddedDay = day.padStart(2, '0');
        const paddedMonth = month.padStart(2, '0');
        
        // Format YYYY-MM-DD attendu par la base de données
        return `${fullYear}-${paddedMonth}-${paddedDay}`;
    } catch (error) {
        console.error('Erreur de formatage de date:', error);
        return null;
    }
};

const DemandeContent = ({
    file,
    markFileAsViewed,
    
}: DemandeContentProps) => {
    const [step, setStep] = useState<'user' | 'profile' | 'project'>('user');
    const [isUserValid, setIsUserValid] = useState(false);
    const [isProfileValid, setIsProfileValid] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        projectCode: file?.projectCode || '',
        role: 'client'
    });
    
    const [projectForm, setProjectForm] = useState<ProjectFormData>({
        name: '',
        description: file?.content || '',
        type: '',
        state: 'draft',
        starterDate: '',
        focusDate: '',
        budget: 0,
        projectCode: file?.projectCode || ''
    });

    const handleUserSubmit = () => {
        if (userForm.displayName && userForm.email && userForm.password && userForm.phone) {
            setIsUserValid(true);
            setStep('profile');
            toast.success('Informations utilisateur validées');
        } else {
            toast.error('Veuillez remplir tous les champs utilisateur');
        }
    };

    const handleProfileSubmit = () => {
        if (profileForm.firstName && profileForm.lastName && profileForm.company) {
            setIsProfileValid(true);
            setStep('project');
            toast.success('Informations profil validées');
        } else {
            toast.error('Veuillez remplir tous les champs profil');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step !== 'project' || !isUserValid || !isProfileValid) return;

        setUpdating(true);
        try {
            const formattedProject = {
                ...projectForm,
                starterDate: formatDateToISO(projectForm.starterDate),
                focusDate: formatDateToISO(projectForm.focusDate)
            };

            // Création de l'utilisateur, profil et projet
            const response = await fetch('/api/create-user-profile-project', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: {
                        ...userForm,
                        needsPasswordChange: true
                    },
                    profile: profileForm,
                    project: formattedProject
                })
            });

            if (!response.ok) throw new Error('Erreur lors de la création');
            
           

           

            // Envoi de l'email
            const sendSessionResponse = await fetch('/api/send-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: userForm.email,
                    fileId: projectForm.projectCode,
                    fileName: `${projectForm.projectCode}.md`
                })
            });

            if (!sendSessionResponse.ok) {
                const error = await sendSessionResponse.json();
                throw new Error(error.error || 'Erreur lors de l\'envoi');
            }
             // Suppression du fichier du bucket
             const projectCode = projectForm.projectCode;
             console.log(projectCode);
             
             const deleteResponse = await fetch(`/api/delete-project-file`, {
                 method: 'DELETE',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({
                    projectIdentifier:  profileForm.projectCode
                 })
             });
 
             if (!deleteResponse.ok) {
                 throw new Error('Erreur lors de la suppression du fichier');
             }

            setSubmissionSuccess(true);
            toast.success('Compte créé et email envoyé avec succès !');
            markFileAsViewed(file.id);

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Une erreur est survenue');
            toast.error('Erreur lors de la création du compte');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <>
            <TabsContent value="apercu" className="mt-0 ">
                <Card className="p-6 max-w-3xl">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(file.created_at).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <FileText className="h-4 w-4" />
                            <span>{(file.size / 1024).toFixed(2)} KB</span>
                        </div>
                    </div>
                    <ReactMarkdown 
                        components={{
                            h1: ({children}) => (
                                <h1 className="text-2xl font-bold mb-4">{children}</h1>
                            ),
                            h2: ({children}) => (
                                <h2 className="text-xl font-bold mb-3 mt-6">{children}</h2>
                            ),
                            h3: ({children}) => (
                                <h3 className="text-lg font-bold mb-2">{children}</h3>
                            ),
                            p: ({children}) => (
                                <p className="mb-4">{children}</p>
                            ),
                            ul: ({children}) => (
                                <ul className="my-4 list-disc pl-6">{children}</ul>
                            ),
                            ol: ({children}) => (
                                <ol className="my-4 list-decimal pl-6">{children}</ol>
                            ),
                            table: ({children}) => (
                                <div className="my-4 overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        {children}
                                    </table>
                                </div>
                            ),
                            thead: ({children}) => (
                                <thead className="bg-gray-50">
                                    {children}
                                </thead>
                            ),
                            tbody: ({children}) => (
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {children}
                                </tbody>
                            ),
                            tr: ({children}) => (
                                <tr className="hover:bg-gray-50">
                                    {children}
                                </tr>
                            ),
                            th: ({children}) => (
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {children}
                                </th>
                            ),
                            td: ({children}) => (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {children}
                                </td>
                            )
                        }}
                        className="prose prose-sm dark:prose-invert max-w-none"
                    >
                        {file.content || 'Aucun contenu disponible'}
                    </ReactMarkdown>
                </Card>
            </TabsContent>

        

            <TabsContent value="actions" className="mt-0 overflow-y-auto">
                <Card className="min-h-[600px] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {!submissionSuccess ? (
                        <div className="p-6">
                            {/* Barre de progression comme avant */}
                            
                            {/* Étape 1 : Utilisateur */}
                            <Card className={`p-8 mb-6 transition-all duration-300 max-w-3xl ${
                                step === 'user' ? 'opacity-100' : 'opacity-50'
                            }`}>
                                <h2 className="text-2xl font-bold mb-6">Informations Utilisateur</h2>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="displayName">Nom d&apos;affichage</Label>
                                        <Input
                                            id="displayName"
                                            value={userForm.displayName}
                                            onChange={(e) => setUserForm({...userForm, displayName: e.target.value})}
                                            disabled={step !== 'user'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={userForm.email}
                                            onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                                            disabled={step !== 'user'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Mot de passe</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={userForm.password}
                                            onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                                            disabled={step !== 'user'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <Input
                                            id="phone"
                                            value={userForm.phone}
                                            onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                                            disabled={step !== 'user'}
                                        />
                                    </div>
                                </div>
                                {step === 'user' && (
                                    <Button 
                                        onClick={handleUserSubmit}
                                        className="w-full mt-6"
                                    >
                                        Continuer vers le profil
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </Card>

                            {/* Étape 2 : Profil */}
                            <Card className={`p-8 mb-6 transition-all duration-300 max-w-3xl ${
                                step === 'profile' ? 'opacity-100' : 'opacity-50'
                            }`}>
                                <h2 className="text-2xl font-bold mb-6">Profil</h2>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Prénom</Label>
                                        <Input
                                            id="firstName"
                                            value={profileForm.firstName}
                                            onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                                            disabled={step !== 'profile'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Nom</Label>
                                        <Input
                                            id="lastName"
                                            value={profileForm.lastName}
                                            onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                                            disabled={step !== 'profile'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Entreprise</Label>
                                        <Input
                                            id="company"
                                            value={profileForm.company}
                                            onChange={(e) => setProfileForm({...profileForm, company: e.target.value})}
                                            disabled={step !== 'profile'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="projectCode">Code projet</Label>
                                        <Input
                                            id="projectCode"
                                            value={profileForm.projectCode}
                                            onChange={(e) => setProfileForm({...profileForm, projectCode: e.target.value})}
                                            disabled={step !== 'profile'}
                                        />
                                    </div>
                                </div>
                                {step === 'profile' && (
                                    <Button 
                                        onClick={handleProfileSubmit}
                                        className="w-full mt-6"
                                    >
                                        Continuer vers le projet
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </Card>

                            {/* Étape 3 : Projet */}
                            <Card className={`p-8 transition-all duration-300 max-w-3xl ${
                                step === 'project' ? 'opacity-100' : 'opacity-50'
                            }`}>
                                <h2 className="text-2xl font-bold mb-6">Projet</h2>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="projectName">Nom du projet</Label>
                                        <Input
                                            id="projectName"
                                            value={projectForm.name}
                                            onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                                            disabled={step !== 'project'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="projectType">Type</Label>
                                        <Input
                                            id="projectType"
                                            value={projectForm.type}
                                            onChange={(e) => setProjectForm({...projectForm, type: e.target.value})}
                                            disabled={step !== 'project'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="starterDate">Date de début</Label>
                                        <Input
                                            id="starterDate"
                                            value={projectForm.starterDate}
                                            onChange={(e) => setProjectForm({...projectForm, starterDate: e.target.value})}
                                            disabled={step !== 'project'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="focusDate">Date de fin</Label>
                                        <Input
                                            id="focusDate"
                                            value={projectForm.focusDate}
                                            onChange={(e) => setProjectForm({...projectForm, focusDate: e.target.value})}
                                            disabled={step !== 'project'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="budget">Budget</Label>
                                        <Input
                                            id="budget"
                                            type="number"
                                            value={projectForm.budget}
                                            onChange={(e) => setProjectForm({...projectForm, budget: Number(e.target.value)})}
                                            disabled={step !== 'project'}
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <textarea
                                            id="description"
                                            value={projectForm.description}
                                            onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                                            disabled={step !== 'project'}
                                            className="w-full h-32 p-2 border rounded-md"
                                        />
                                    </div>
                                </div>
                                {step === 'project' && (
                                    <Button 
                                        onClick={handleSubmit}
                                        className="w-full mt-6"
                                        disabled={updating}
                                    >
                                        {updating ? "En cours..." : "Finaliser la création"}
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </Card>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <Alert>
                                <AlertDescription>
                                    L&apos;utilisateur, le profil et le projet ont été créés avec succès!
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}
                </Card>
            </TabsContent>
        </>
    )
}

export default DemandeContent