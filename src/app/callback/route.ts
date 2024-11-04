import { COOKIES_NAME } from '@/lib/constants'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code')
    if (!code) return NextResponse.redirect(new URL('/', request.nextUrl))

    try {
        const tokenData = await fetch(
            'https://github.com/login/oauth/access_token',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                }),
            },
        ).then(r => r.json())

        if (!tokenData.access_token) {
            console.log('No TOKEN', tokenData)
            return NextResponse.json(
                { error: 'No se pudo obtener el token de acceso' },
                { status: 400 },
            )
        }

        const response = NextResponse.redirect(new URL('/', request.nextUrl))
        response.cookies.set(COOKIES_NAME.SESSION, tokenData.access_token)
        return response
    } catch (error) {
        console.error('Error al autenticar con GitHub:', error)
        return NextResponse.json(
            { error: 'Error al autenticar con GitHub' },
            { status: 500 },
        )
    }
}
