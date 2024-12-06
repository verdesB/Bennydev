import { createClient } from '@supabase/supabase-js'
interface Project {
    id: string;
    name: string;
    description: string;
    type: string;
    state: string;
    starter_date: string;
    focus_date: string;
    budget: number;
};

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

export async function POST(request: Request) {
    const { projectCode } = await request.json()
    console.log("Code projet reçu:", projectCode);

    try {
        // 1. Récupérer le profil
        const { data: profileData, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('project_code', projectCode)
            .single();

        if (profileError) {
            console.log("Erreur Profil:", profileError);
            throw profileError;
        }

        // 2. Récupérer les données utilisateur
        const { data: userData, error: userError } = await supabaseAdmin
            .auth
            .admin
            .getUserById(profileData.id);

        if (userError) {
            console.log("Erreur User:", userError);
            throw userError;
        }

        // 3. Récupérer le projet via la table de jointure
        const { data: projectData , error: projectError } = await supabaseAdmin
            .from('user_projects')
            .select(`
                role,
                projects:projects!inner (
                    id,
                    name,
                    description,
                    type,
                    state,
                    starter_date,
                    focus_date,
                    budget
                )
            `)
            .eq('user_id', userData.user.id)
            .single();

        if (projectError) {
            console.log("Erreur Projet:", projectError);
            throw projectError;
        }

        console.log("Project Data:", projectData);

        // Assurez-vous que projectData.projects est typé comme un tableau de Project
        const projects: Project[] = projectData.projects;

        // Reformater les données selon l'interface UserResponse
        const combinedData = {
            user: {
                displayName: userData.user.user_metadata.displayName || '',
                email: profileData.email,
                phone: profileData.phone,
            },
            profile: {
                firstName: profileData.first_name,
                lastName: profileData.last_name,
                company: profileData.company,
                projectCode: profileData.project_code,
            },
            project: {
                name: projects[0].name, // Accéder au premier élément du tableau
                description: projects[0].description,
                type: projects[0].type,
                state: projects[0].state,
                starterDate: projects[0].starter_date,
                focusDate: projects[0].focus_date,
                budget: projects[0].budget,
            }
        };

        console.log("Données reformatées:", combinedData);
        return Response.json({ data: combinedData })
    } catch (error) {
        console.error('Erreur détaillée:', error)
        return Response.json({ 
            error: 'Erreur lors de la vérification',
            details: error instanceof Error ? error.message : 'Erreur inconnue'
        }, { status: 500 })
    }
}