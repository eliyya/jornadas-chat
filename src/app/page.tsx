import Image from 'next/image'
import LogoJorndas from '@/images/LOGO_JORNADAS_SIN.png'
import Link from 'next/link'
import { getUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import GithubLogo from '@/images/github-mark-white.png'

export default async function Home() {
    const user = await getUser()
    if (user) redirect('/chat')
    return (
        <div className="flex min-h-screen sm:w-2/3 lg:w-1/2 w-full flex-col gap-3">
            <div className="mx-auto grid max-w-2xl content-center">
                <div className="grid h-screen items-center">
                    <div className="-mt-12 flex max-w-xs flex-col">
                        <div className="mx-auto">
                            <Image src={LogoJorndas} alt="logo jornadas" />
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
                            href={'/login'}
                            className="text-center rounded-md border-gray-500 border p-2 hover:bg-gray-800 transition-all flex justify-center gap-2 items-center"
                        >
                            Login with GitHub
                            <Image
                                alt="GitHub Logo"
                                src={GithubLogo}
                                width={24}
                                height={24}
                            ></Image>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
