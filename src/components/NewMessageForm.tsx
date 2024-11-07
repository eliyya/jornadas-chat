'use client'

import { createMessage } from '@/lib/messages'
import { useSocket } from '@/lib/socket'
import { useTransition } from 'react'

interface NewMessageFormProps {
    user: string
    avatar?: string
}
export function NewMessageForm({ user, avatar }: NewMessageFormProps) {
    const [isPending, startTransition] = useTransition()
    const socket = useSocket()
    return (
        <form
            className="flex gap-2"
            action={async data => {
                startTransition(async () => {
                    await createMessage({
                        message: data.get('message') as string,
                        socket,
                        username: user,
                        avatar,
                    })
                })
            }}
        >
            <div className="flex-grow">
                <label htmlFor="message" className="sr-only">
                    Message
                </label>
                <input
                    name="message"
                    className="h-full w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    autoComplete="off"
                    placeholder="Message"
                    required
                />
            </div>
            <button
                disabled={isPending}
                className="relative cursor-pointer rounded-md disabled:cursor-not-allowed px-5 py-2 text-white bg-red-500 enabled:hover:bg-red-400 disabled:bg-red-300"
            >
                Send
            </button>
        </form>
    )
}
