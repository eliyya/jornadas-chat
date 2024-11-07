'use client'
import { logout } from '@/actions/auth'
import Image from 'next/image'
import { useState, useTransition } from 'react'

interface HeaderChatProps {
    user: string
    avatar?: string
}
export function HeaderChat({
    user,
    avatar = '/LOGO_JORNADAS_SIN.png',
}: HeaderChatProps) {
    const [showMenu, toggleMenu] = useState(false)
    const [isPending, startTransition] = useTransition()

    return (
        <div className="rounded-b-lg border-gray-200 bg-white p-4 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3 truncate font-semibold text-black">
                RealtimeChat
            </div>
            <div>
                <div className="relative">
                    {/* PFP */}
                    <button
                        className="-m-3 block p-3"
                        onClick={() => toggleMenu(t => !t)}
                    >
                        <div className="h-9 w-9 hover:opacity-80 relative">
                            <Image
                                className="rounded-full"
                                src={avatar}
                                alt="PFP"
                                width={36}
                                height={36}
                            ></Image>
                            <span className="absolute right-0 top-0 block h-2 w-2 rounded-full ring-2 ring-white transition-colors bg-green-400"></span>
                        </div>
                    </button>
                    {/* Menu */}
                    {showMenu && (
                        <nav className="absolute z-10 mt-0.5 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none right-0 transform opacity-100 scale-100 divide-y divide-gray-100 overflow-hidden">
                            <div className="w-full truncate py-1 pl-6 pr-3 text-sm leading-6 text-gray-500">
                                elimacmun@gmail.com
                            </div>
                            <div className="w-full truncate py-2 pl-6 pr-3 text-sm leading-6 text-gray-500 -ml-3 flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full transition-colors bg-green-400"></div>
                                <div className="text-xs text-gray-500">
                                    Conected
                                </div>
                            </div>
                            <form
                                className="pt-1"
                                action={() => {
                                    startTransition(async () => {
                                        await logout()
                                    })
                                }}
                            >
                                <button
                                    type="submit"
                                    className="block w-full pr-3 pl-6 py-1 text-left text-sm leading-6 text-gray-900 hover:bg-gray-100 disabled:text-gray-600"
                                    disabled={isPending}
                                >
                                    Sign Out
                                </button>
                            </form>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    )
}
