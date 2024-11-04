'use client'

import { socket } from '@/lib/socket'
import { atom } from 'nanostores'

export interface Message {
    id: string
    username: string
    avatar?: string
    content: string
    createdAt: string
}

export const $messages = atom<Message[]>([])

export const addMessage = (message: Message) => {
    $messages.set([...$messages.get(), message])
}

export const createMessage = async (message: string, username: string) => {
    const body = {
        content: message,
        createdAt: new Date().toString(),
        id: crypto.randomUUID(),
        username,
    }
    socket.emit('sendMessage', body)
    addMessage(body)
    console.log(body)
}
