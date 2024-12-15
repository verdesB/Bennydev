import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient(
            { cookies: () => cookieStore },
            {
                supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
                supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            }
        );

        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Vérification de l'admin
        const { data: { user: adminUser } } = await supabase.auth.getUser();
        if (!adminUser) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const { user, profile, project } = await req.json();

        // Vérifier si le projet existe déjà
        const { data: existingProject, error: checkError } = await supabaseAdmin
            .from('projects')
            .select('id')
            .eq('code_project', project.projectCode)
            .single();

        if (existingProject) {
            return NextResponse.json(
                { error: 'Un projet avec ce code existe déjà' },
                { status: 409 }
            );
        }

        // Vérifier si l'email existe déjà
        const { data: existingUser, error: userCheckError } = await supabaseAdmin
            .auth.admin.listUsers();

        const emailExists = existingUser?.users.some(u => u.email === user.email);
        if (emailExists) {
            return NextResponse.json(
                { error: 'Un utilisateur avec cet email existe déjà' },
                { status: 409 }
            );
        }

        // 1. Créer l'utilisateur auth
        const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
            email: user.email,
            password: user.password,
            email_confirm: true,
            user_metadata: {
                displayName: user.displayName,
                phone: user.phone
            }
        });

        if (createUserError) {
            console.error('Erreur création utilisateur:', createUserError);
            return NextResponse.json({ error: createUserError.message }, { status: 400 });
        }

        // 2. Vérifier si un profil vide a été créé automatiquement
        const { data: existingProfile } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', newUser.user.id)
            .single();

        // 3. Créer ou mettre à jour le profil
        const profileData = {
            id: newUser.user.id,
            first_name: profile.firstName,
            last_name: profile.lastName,
            company: profile.company,
            project_code: profile.projectCode,
            role: 'client',
            email: newUser.user.email,
            phone: newUser.user.phone
        };

        let profileOperation;
        if (existingProfile) {
            // Mettre à jour le profil existant
            profileOperation = supabaseAdmin
                .from('profiles')
                .update(profileData)
                .eq('id', newUser.user.id)
                .select()
                .single();
        } else {
            // Créer un nouveau profil
            profileOperation = supabaseAdmin
                .from('profiles')
                .insert(profileData)
                .select()
                .single();
        }

        const { data: newProfile, error: profileError } = await profileOperation;

        if (profileError) {
            console.error('Erreur profil:', profileError);
            await supabaseAdmin.auth.admin.deleteUser(newUser.user.id);
            return NextResponse.json({
                error: profileError.message,
                details: profileError
            }, { status: 400 });
        }

        // 4. Création du projet
        const { data: newProject, error: projectError } = await supabaseAdmin
            .from('projects')
            .insert({
                name: project.name,
                description: project.description,
                type: project.type,
                state: project.state || 'draft',
                starter_date: project.starterDate,
                focus_date: project.focusDate,
                budget: project.budget,
                code_project: project.projectCode
            })
            .select()
            .single();

        if (projectError) {
            // Nettoyer en cas d'erreur
            await supabaseAdmin.auth.admin.deleteUser(newUser.user.id);
            return NextResponse.json(
                { error: projectError.message },
                { status: 400 }
            );
        }

        // 5. Création des relations user_projects
        const userProjectsToInsert = [
            {
                user_id: newUser.user.id,
                project_id: newProject.id,
                role: 'member'
            },
            {
                user_id: adminUser.id,
                project_id: newProject.id,
                role: 'owner'
            }
        ];

        const { error: userProjectsError } = await supabaseAdmin
            .from('user_projects')
            .insert(userProjectsToInsert);

        if (userProjectsError) {
            // Nettoyer en cas d'erreur
            await supabaseAdmin.auth.admin.deleteUser(newUser.user.id);
            await supabaseAdmin
                .from('projects')
                .delete()
                .match({ id: newProject.id });

            return NextResponse.json(
                { error: userProjectsError.message },
                { status: 400 }
            );
        }

        // 4.1 Création du bucket Supabase
        const bucketName = `Bennydev.${project.projectCode}`;
        const { error: bucketError } = await supabaseAdmin
            .storage
            .createBucket(bucketName, {
                public: true
            });

        // Vérifier l'erreur de création du bucket
        if (bucketError) {
            // Nettoyer en cas d'erreur
            await supabaseAdmin.auth.admin.deleteUser(newUser.user.id);
            await supabaseAdmin
                .from('projects')
                .delete()
                .match({ id: newProject.id });

            return NextResponse.json(
                { error: bucketError.message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            message: "Création réussie",
            data: {
                user: {
                    id: newUser.user.id,
                    email: newUser.user.email,
                    displayName: user.displayName
                },
                profile: newProfile,
                project: newProject
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Erreur:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}