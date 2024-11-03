'use server'

import { COOKIES_NAME } from '@/lib/constants'
import { GithubSuccesResponse } from '@/types'
import { cookies } from 'next/headers'

export async function getUser(): Promise<GithubSuccesResponse | null> {
    const token = (await cookies()).get(COOKIES_NAME.SESSION)?.value
    if (!token) return null
    const userData = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(r => r.json())
        .catch(() => null)
    if (!userData) {
        await logout()
        return null
    }
    return userData as GithubSuccesResponse
}

export async function logout() {
    ;(await cookies()).delete(COOKIES_NAME.SESSION)
}

export async function getToken() {
    return (await cookies()).get(COOKIES_NAME.SESSION)?.value || null
}
