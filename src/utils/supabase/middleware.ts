import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    console.log('[Middleware] Comprobando sesión para:', request.nextUrl.pathname)

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // 1. Rutas Protegidas: /profile, /journal
    if ((request.nextUrl.pathname.startsWith('/profile') || request.nextUrl.pathname.startsWith('/journal')) && !user) {
        console.log('[Middleware] Acceso no autorizado a ruta protegida. Redirigiendo a /login')
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 2. Rutas de Auth: /login, /register (Redirigir al perfil si ya se ha iniciado sesión)
    if ((request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) && user) {
        console.log('[Middleware] Usuario ya logueado. Redirigiendo a /profile')
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    return response
}
