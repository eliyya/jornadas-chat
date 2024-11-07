import type { Metadata } from 'next'
import './globals.css'
import { SessionProvider } from '@/lib/session'

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    )
}
