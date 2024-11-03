import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.redirect(
        `https://github.com/login/oauth/authorize?client_id=${
            process.env.GITHUB_CLIENT_ID
        }&scope=user&redirect_uri=${encodeURIComponent(
            process.env.GITHUB_CALLBACK_URL!,
        )}`,
    )
}
