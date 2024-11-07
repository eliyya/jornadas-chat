'use client'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react'

const SessionContext = createContext<{
    username: string | null
    avatar?: string
    setUsername: Dispatch<SetStateAction<string | null>>
    setAvatar: Dispatch<SetStateAction<string | undefined>>
} | null>(null)

interface SessionProviderProps {
    children: ReactNode
}
export function SessionProvider({ children }: SessionProviderProps) {
    const [username, setUsername] = useState<string | null>(null)
    const [avatar, setAvatar] = useState<string | undefined>()

    return (
        <SessionContext.Provider
            value={{ username, setUsername, setAvatar, avatar }}
        >
            {children}
        </SessionContext.Provider>
    )
}

export function useSession() {
    const context = useContext(SessionContext)!
    return context
}
