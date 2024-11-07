'use client'

import { useSession } from '@/lib/session'

export function Login() {
    const { setUsername, username, setAvatar, avatar } = useSession()
    return (
        <form
            action={d => {
                const usern = d.get('username') as string
                setUsername(usern)
                fetch('https://api.github.com/users/' + usern, {
                    headers: {
                        'Content-Type': 'application/json', // Tipo de contenido
                    },
                })
                    .then(r => r.json())
                    .then(({ avatar_url }) => {
                        setAvatar(avatar_url)
                    })
                    .catch(() => null)
            }}
            className="flex gap-1"
        >
            <input type="text" name="username" className="flex-1 rounded-lg" />
            <button
                type="submit"
                className="p-2 px-4 rounded-lg text-black bg-white"
            >
                login
            </button>
        </form>
    )
}
