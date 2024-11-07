'use client'
import Image from 'next/image'
import { HeaderChat } from '@/components/HeaderChat'
import { MessageList } from '@/components/MessageList'
import { NewMessageForm } from '@/components/NewMessageForm'
import { SocketProvider } from '@/lib/socket'
import { Login } from '@/components/Login'
import { useSession } from '@/lib/session'

export default function Home() {
    const { setUsername, username, setAvatar, avatar } = useSession()
    // Si esta logeado renderiza el chat
    if (username)
        return (
            <div className="relative flex min-h-screen sm:w-2/3 lg:w-1/2 w-full flex-col gap-3">
                <SocketProvider>
                    <div className="sticky top-0 z-10 -mx-2 px-2">
                        <HeaderChat user={username} />
                    </div>
                    <div className="flex-1">
                        <MessageList user={username} />
                    </div>
                    <div className="sticky bottom-0 -mx-2 py-2 pb-10 px-2">
                        <NewMessageForm user={username} />
                    </div>
                </SocketProvider>
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
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    )
}
