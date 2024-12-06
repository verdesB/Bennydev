import { createClient } from '@supabase/supabase-js';

interface Project {
    id: string;
    name: string;
    description: string;
    type: string;
    state: string;
    starter_date: string;
    focus_date: string;
    budget: number;
    user_projects: {
        role: string;
        user_id: string;
    }[];
}

export async function GET() {
    try {
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data: projectsData, error: projectsError } = await supabaseAdmin
            .from('projects')
            .select(`
                *,
                user_projects (
                    role,
                    user_id
                )
            `) as { data: Project[] | null, error: Error };

        if (projectsError) throw projectsError;
        if (!projectsData) throw new Error('Aucun projet trouvé');

        const userIds = projectsData.flatMap(project => 
            project.user_projects?.map(up => up.user_id) || []
        );

        if (userIds.length === 0) {
            return Response.json({ 
                success: true,
                data: projectsData
            });
        }

        const { data: profilesData, error: profilesError } = await supabaseAdmin
            .from('profiles')
            .select('id, first_name, last_name, email, phone, company, project_code, role')
            .in('id', userIds);

        if (profilesError) throw profilesError;

        const formattedProjects = projectsData.map(project => ({
            ...project,
            user_projects: project.user_projects?.map(up => ({
                role: up.role,
                user_id: up.user_id,
                profile: profilesData?.find(p => p.id === up.user_id) || null
            })) || []
        }));

        return Response.json({ 
            success: true,
            data: formattedProjects
        });
    } catch (error) {
        console.error('Erreur détaillée:', error);
        const errorMessage = error instanceof Error 
            ? error.message 
            : typeof error === 'object' && error !== null
                ? JSON.stringify(error)
                : String(error);
                
        return Response.json({ 
            error: 'Erreur lors de la récupération des projets',
            details: errorMessage
        }, { status: 500 });
    }
} 