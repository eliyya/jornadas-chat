import { Message as IMessage } from '@/lib/messages'
import Image from 'next/image'

interface MessageProps {
    message: IMessage
    mine: boolean
    showName: boolean
    showAvatar: boolean
}
export function Message({ message, showName, mine, showAvatar }: MessageProps) {
    const getAvatar = (av: string) => {
        const baseUrl = new URL(av)
        baseUrl.searchParams.append('size', '36')
        return baseUrl.toString()
    }
    return (
        <div
            className={`relative flex max-w-[85%] flex-col gap-1 rounded-md border p-2 pb-1 shadow md:max-w-[66%] text-black ${
                mine
                    ? 'self-end border-red-200 bg-red-100'
                    : 'self-start bg-white'
            }`}
        >
            {showAvatar && (
                <div className="absolute bottom-0 left-0 h-8 w-8 -translate-x-[calc(100%+8px)]">
                    <div className="relative">
                        <Image
                            src={getAvatar(message.avatar)}
                            className="rounded-full"
                            alt="PFP"
                            width={36}
                            height={36}
                        />
                    </div>
                </div>
            )}
            {showName && (
                <span className="select-none truncate text-xs font-semibold text-gray-400">
                    {message.username}
                </span>
            )}
            <p>{message.content}</p>
            <time
                className={`select-none text-right text-xs`}
                title={message.createdAt}
                dateTime={message.createdAt}
            >
                {formatDateToHours(message.createdAt)}
            </time>
        </div>
    )
}

export function formatDateToHours(dateString: string) {
    const date = new Date(dateString)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${hours}:${minutes}`
}
