import { getUser } from '@/actions/auth'
import { HeaderChat } from '@/components/HeaderChat'
import { MessageList } from '@/components/MessageList'
import { NewMessageForm } from '@/components/NewMessageForm'
import { redirect } from 'next/navigation'

export default async function ChatPage() {
    const user = await getUser()
    if (!user) redirect('/')
    return (
        <div className="relative flex min-h-screen sm:w-2/3 lg:w-1/2 w-full flex-col gap-3">
            <div className="sticky top-0 z-10 -mx-2 px-2">
                <HeaderChat user={user} />
            </div>
            <div className="flex-1">
                <MessageList />
            </div>
            <div className="sticky bottom-0 -mx-2 py-2 pb-10 px-2">
                <NewMessageForm user={user} />
            </div>
        </div>
    )
}
