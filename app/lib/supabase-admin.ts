import { createClient } from '@supabase/supabase-js'

// Client avec les droits admin
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        },
        db: {
            schema: 'public'
        },
        // Désactiver RLS pour le client admin
        global: {
            headers: {
                'x-supabase-auth-bypass-rls': 'true'
            }
        }
    }
) 