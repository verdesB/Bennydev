import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase-admin';

export async function GET() {
  try {
    // On commence par récupérer les profiles clients
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('role', 'client');

    if (profilesError) throw profilesError;

    // Correction ici : utilisation de "auth" au lieu de "auth.users"
    const { data: users, error: usersError } = await supabaseAdmin
      .auth.admin.listUsers();

    if (usersError) throw usersError;

    // On combine les deux résultats
    const formattedUsers = users.users
      .filter(user => profiles.some(profile => profile.id === user.id))
      .map(user => {
        const profile = profiles.find(p => p.id === user.id);
        return {
          id: user.id,
          nom: user.user_metadata?.name || '',
          email: user.email || '',
          telephone: profile?.phone || '',
          dateInscription: profile?.created_at?.split('T')[0] || '',
        };
      });

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    );
  }
} 