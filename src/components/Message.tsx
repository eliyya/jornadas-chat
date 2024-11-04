import { Message as IMessage } from '@/stores/messages'

interface MessageProps {
    message: IMessage
    mine: boolean
    showName: boolean
    showAvatar: boolean
}
export function Message({ message, showName, mine, showAvatar }: MessageProps) {
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
                        <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 15 15"
                            className="h-full w-full text-gray-500"
                        >
                            <path
                                fill="currentColor"
                                d="M5 5.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0Z"
                            />
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M7.5 0a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1 7.5a6.5 6.5 0 1 1 10.988 4.702A3.5 3.5 0 0 0 8.5 9h-2a3.5 3.5 0 0 0-3.488 3.202A6.482 6.482 0 0 1 1 7.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
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
