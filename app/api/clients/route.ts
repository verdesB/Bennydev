
import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/app/lib/supabase-admin';

export async function GET() {
  try {
  

    // D'abord, récupérer tous les profils
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('role', 'client');  

    if (profilesError) throw profilesError;

    // Ensuite, récupérer les utilisateurs correspondants depuis auth.users
    const { data: users, error: usersError } = await supabaseAdmin
      .auth.admin.listUsers();  // Utilisation de auth.admin pour accéder à auth.users

    if (usersError) throw usersError;

    // Combiner les données
    const safeClients = profiles?.map(profile => {
      const user = users?.users?.find(u => u.id === profile.id);
      return {
        id: profile.id,
        email: user?.email || '',
        nom: profile.last_name || '',
        prenom: profile.first_name || '',
        telephone: profile.phone || '',
        dateInscription: user?.created_at || '',
        isPremium: profile.issupportpremium || false,
        datePremium: profile.premium_timestamp || null,
        societe: profile.company || '',
      };
    });

    return NextResponse.json(safeClients || []);

  } catch (error) {
    console.error("[CLIENTS_GET]", error);
    return new NextResponse("Erreur Interne", { status: 500 });
  }
} 