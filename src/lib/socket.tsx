'use client'
import { Message } from '@/lib/messages'
import { createContext, ReactNode, useContext } from 'react'
import { io, Socket as IOSocket } from 'socket.io-client'

interface EventsListenerMap {
    // [event: string]: (...args: any[]) => void
    authSuccess: (data: {
        message: string
        user: { username: string; avatar?: string }
    }) => any
    authError: (data: { message: string }) => any
    message(data: Message): any
}

interface EventsEmitMap {
    // [event: string]: (...args: any[]) => void
    auth: (username: string) => any
    sendMessage: (message: Message) => any
}

export class Socket {
    instance?: IOSocket<EventsListenerMap, EventsEmitMap>
    constructor() {}

    async createInstance(username: string) {
        return new Promise<this>((resolve, reject) => {
            this.instance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
                transports: ['websocket'],
                rejectUnauthorized: false,
            })
            console.log('connect')
            this.instance.on('connect', async () => {
                console.log('conected')
                await this.authenticateSocket(username)
                resolve(this)
            })
            this.instance.on('connect_error', err => {
                console.log('connect_error', err)
            })
        })
    }

    emit<K extends keyof EventsEmitMap>(
        ev: K,
        ...args: Parameters<EventsEmitMap[K]>
    ) {
        this.instance?.emit(ev, ...args)
    }

    onMessage(cb: EventsListenerMap['message']) {
        this.instance?.on('message', cb)
    }

    authenticateSocket(username: string) {
        return new Promise<IOSocket<EventsListenerMap, EventsEmitMap>>(
            (resolve, reject) => {
                if (!this.instance) reject(new Error("Don't have an instance"))
                this.instance?.emit('auth', username)
                console.log('trying authenticate')

                this.instance?.on('authSuccess', data => {
                    console.log('Authenticated:', data)
                    resolve(this.instance!)
                })

                this.instance?.on('authError', ({ message }) => {
                    console.error('Authentication failed:', message)
                    reject(new Error(message))
                })
            },
        )
    }
}

const SocketContext = createContext<Socket | null>(null)

interface SocketProviderProps {
    children: ReactNode
}
export function SocketProvider({ children }: SocketProviderProps) {
    const socket = new Socket()

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider')
    }
    return context
}
