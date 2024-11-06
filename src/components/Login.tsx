'use client'
export function Login() {
    return (
        <form action="" className="flex gap-1">
            <input type="text" className="flex-1 rounded-lg" />
            <button
                type="submit"
                className="p-2 px-4 rounded-lg text-black bg-white"
            >
                login
            </button>
        </form>
    )
}
