'use client'

export function Login() {
    // TODO: get session
    return (
        <form
            action={d => {
                // TODO: get username
                // TODO: set session
                // TODO: get avatar
                // TODO: set avatar
            }}
            className="flex gap-1"
        >
            <input type="text" name="username" className="flex-1 rounded-lg" />
            <button
                type="submit"
                className="p-2 px-4 rounded-lg text-black bg-white"
            >
                login
            </button>
        </form>
    )
}
