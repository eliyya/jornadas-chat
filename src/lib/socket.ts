import { GithubSuccesResponse } from '@/types'
import { io } from 'socket.io-client'

export const socket = io(process.env.WEBSOCKET_URL, {
    transports: ['websocket'],
})

// Función para autenticar el socket
export const authenticateSocket = (token: string) => {
    return new Promise<typeof socket>((resolve, reject) => {
        socket.emit('auth', token)

        socket.on(
            'authSuccess',
            (data: { message: string; user: GithubSuccesResponse }) => {
                console.log('Authenticated:', data)
                resolve(socket)
            },
        )

        socket.on('authError', ({ message }: { message: string }) => {
            console.error('Authentication failed:', message)
            reject(new Error(message))
        })
    })
}
