import Image from 'next/image'
import Link from 'next/link'
import { getUser } from '@/actions/auth'
import { HeaderChat } from '@/components/HeaderChat'
import { MessageList } from '@/components/MessageList'
import { NewMessageForm } from '@/components/NewMessageForm'

export default async function Home() {
    const user = await getUser()
    // Si esta logeado renderiza el chat
    if (user)
        return (
            <div className="relative flex min-h-screen sm:w-2/3 lg:w-1/2 w-full flex-col gap-3">
                <div className="sticky top-0 z-10 -mx-2 px-2">
                    <HeaderChat user={user} />
                </div>
                <div className="flex-1">
                    <MessageList user={user} />
                </div>
                <div className="sticky bottom-0 -mx-2 py-2 pb-10 px-2">
                    <NewMessageForm user={user} />
                </div>
            </div>
        )

    // si no esta logueado, renderiza el login
    return (
        <div className="flex min-h-screen sm:w-2/3 lg:w-1/2 w-full flex-col gap-3">
            <div className="mx-auto grid max-w-2xl content-center">
                <div className="grid h-screen items-center">
                    <div className="-mt-12 flex max-w-xs flex-col">
                        <div className="mx-auto">
                            <Image
                                src={'/LOGO_JORNADAS_SIN.png'}
                                alt="logo jornadas"
                                width={320}
                                height={247}
                            />
                        </div>
                        <div className="my-10">
                            <h1 className="mb-4 text-center text-2xl font-semibold text-balance">
                                Welcome to Realtime Chat
                            </h1>
                            <p className="text-sm">
                                Before you start chatting, log in with your
                                GitHub account to verify who you are.
                            </p>
                        </div>
                        <Link
                            href={`https://github.com/login/oauth/authorize?client_id=${
                                process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
                            }&scope=user&redirect_uri=${encodeURIComponent(
                                process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL!,
                            )}`}
                            className="text-center rounded-md border-gray-500 border p-2 hover:bg-gray-800 transition-all flex justify-center gap-2 items-center"
                        >
                            Login with GitHub
                            <Image
                                alt="GitHub Logo"
                                src={'/github-mark-white.png'}
                                width={24}
                                height={24}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
