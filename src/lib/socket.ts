import { Message } from '@/lib/messages'
import { GithubSuccesResponse } from '@/types'
import { io, Socket as IOSocket } from 'socket.io-client'

interface EventsListenerMap {
    // [event: string]: (...args: any[]) => void
    authSuccess: (data: { message: string; user: GithubSuccesResponse }) => any
    authError: (data: { message: string }) => any
    message(data: { username: string; message: string }): any
}

type kyes = EventsListenerMap['authSuccess']
const a: kyes = a => null
interface EventsEmitMap {
    // [event: string]: (...args: any[]) => void
    auth: (token: string) => any
    sendMessage: (message: Message) => any
}
class Socket {
    instance?: IOSocket<EventsListenerMap, EventsEmitMap>
    constructor() {}

    async createInstance(token: string) {
        return new Promise((resolve, reject) => {
            this.instance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
                transports: ['websocket'],
            })
            console.log('connect')
            this.instance.on('connect', async () => {
                console.log('conected')
                await this.authenticateSocket(token)
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

    authenticateSocket(token: string) {
        return new Promise<IOSocket<EventsListenerMap, EventsEmitMap>>(
            (resolve, reject) => {
                if (!this.instance) reject(new Error("Don't have an instance"))
                this.instance?.emit('auth', token)
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

declare const globalThis: {
    socketGlobal: Socket
} & typeof global

const socket = globalThis.socketGlobal ?? new Socket()
if (process.env.NODE_ENV !== 'production') globalThis.socketGlobal = socket
export { socket }
