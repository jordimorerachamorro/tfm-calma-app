import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    console.log('[Middleware] Checking session for:', request.nextUrl.pathname)

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

    // 1. Protected Routes: /profile
    if (request.nextUrl.pathname.startsWith('/profile') && !user) {
        console.log('[Middleware] Unauthorized access to /profile. Redirecting to /login')
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 2. Auth Routes: /login, /register (Redirect to profile if already logged in)
    if ((request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) && user) {
        console.log('[Middleware] User already logged in. Redirecting to /profile')
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    return response
}
