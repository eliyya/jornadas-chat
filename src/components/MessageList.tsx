'use client'

import { $messages, useStore } from '@/lib/messages'
import { Message } from './Message'
import { useEffect } from 'react'
import { useSocket } from '@/lib/socket'
import { getToken } from '@/actions/auth'

interface MessageListProps {
    user: string
}
export function MessageList({ user }: MessageListProps) {
    const messages = useStore($messages)
    const socket = useSocket()

    useEffect(() => {
        const executeAsync = async () => {
            const token = (await getToken())!
            const s = await socket.createInstance(token)
            s.onMessage(data => {
                $messages.set([
                    ...$messages.get().filter(m => m.id !== data.id),
                    data,
                ])
            })
        }
        executeAsync()
    }, [socket])

    return (
        <main className="flex h-full flex-col justify-end gap-2 py-4 pl-8">
            {messages.map((message, i) => {
                console.log({ message }, user)

                const mine = message.username === user
                const showName =
                    !mine && messages[i - 1]?.username !== message.username
                const showAvatar =
                    !mine && messages[i + 1]?.username !== message.username
                return (
                    <Message
                        showAvatar={showAvatar}
                        showName={showName}
                        mine={mine}
                        message={message}
                        key={message.id}
                    />
                )
            })}
        </main>
    )
}
