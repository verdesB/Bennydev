import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Map pour stocker les requêtes
const requestMap = new Map<string, number[]>();

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Rate limiting pour /api/contact
  if (req.nextUrl.pathname === '/api/contact') {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    
    const requestLog = requestMap.get(ip) || [];
    const recentRequests = requestLog.filter(time => time > now - windowMs);
    
    if (recentRequests.length >= 5) {
      return NextResponse.json(
        { message: 'Trop de requêtes' },
        { status: 429 }
      );
    }
    
    recentRequests.push(now);
    requestMap.set(ip, recentRequests);
    return res; // Retourne directement pour /api/contact
  }

  // Reste de votre middleware existant
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Nouvelle vérification pour /api/demande
  if (req.nextUrl.pathname.startsWith('/api/demande')) {
    if (!session) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
    }
  }

  // Le reste du middleware existant pour /admin et /client
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!profile || profile.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/client')) {
    if (!profile || profile.role !== 'client') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/admin/:path*', 
    '/client/:path*',
    '/api/admin/:path*',
    '/api/contact',
    '/api/demande/:path*'  // Ajout du nouveau matcher
  ]
}; 