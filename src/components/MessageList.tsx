'use client'

import { useStore } from '@/hooks/useStore'
import { $messages } from '@/stores/messages'
import { Message } from './Message'
import { useEffect } from 'react'
import { authenticateSocket } from '@/lib/socket'
import { getToken } from '@/actions/auth'
import { GithubSuccesResponse } from '@/types'

interface MessageListProps {
    user: GithubSuccesResponse
}
export function MessageList({ user }: MessageListProps) {
    const messages = useStore($messages)
    useEffect(() => {
        const executeAsync = async () => {
            const token = (await getToken())!
            await authenticateSocket(token)
        }
        executeAsync()
    }, [])
    return (
        <main className="flex h-full flex-col justify-end gap-2 py-4 pl-8">
            {messages.map((message, i) => {
                const mine = message.username === user.login
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
