'use client'

import { socket } from '@/lib/socket'
import { listenKeys, Store, StoreValue, atom } from 'nanostores'
import {
    useCallback,
    useRef,
    useSyncExternalStore,
    DependencyList,
    MutableRefObject,
} from 'react'

export interface Message {
    id: string
    username: string
    avatar?: string
    content: string
    createdAt: string
}

export const $messages = atom<Message[]>([])

export const addMessage = (message: Message) => {
    $messages.set([...$messages.get(), message])
}

export const createMessage = async (message: string, username: string) => {
    const body = {
        content: message,
        createdAt: new Date().toString(),
        id: crypto.randomUUID(),
        username,
    }
    socket.emit('sendMessage', body)
    addMessage(body)
    console.log(body)
}

/**
 * Este codigo siguiente ha sido tomado de
 * https://github.com/nanostores/react/blob/f8867b50aeb8a2ba4e6e6979f7d01da9c0181c77/index.js
 * con la licencia MIT
 */

let emit =
    (snapshotRef: MutableRefObject<any>, onChange: Function) =>
    (value: any) => {
        snapshotRef.current = value
        onChange()
    }

type StoreKeys<T> = T extends { setKey: (k: infer K, v: any) => unknown }
    ? K
    : never

export interface UseStoreOptions<SomeStore> {
    deps?: DependencyList
    keys?: StoreKeys<SomeStore>[]
}

/**
 * Subscribe to store changes and get store’s value.
 *
 * Can be user with store builder too.
 *
 * ```js
 * import { useStore } from 'nanostores/react'
 *
 * import { router } from '../store/router'
 *
 * export const Layout = () => {
 *   let page = useStore(router)
 *   if (page.route === 'home') {
 *     return <HomePage />
 *   } else {
 *     return <Error404 />
 *   }
 * }
 * ```
 *
 * @param store Store instance.
 * @returns Store value.
 */
export function useStore<SomeStore extends Store>(
    store: SomeStore,
    { keys, deps = [store, keys] }: UseStoreOptions<SomeStore> = {},
): StoreValue<SomeStore> {
    let snapshotRef = useRef()
    snapshotRef.current = store.get()
    let subscribe = useCallback(
        (onChange: Function) =>
            (keys?.length as number) > 0
                ? listenKeys(
                      store as { setKey: (key: any, value: any) => void },
                      keys as StoreKeys<SomeStore>[],
                      emit(snapshotRef, onChange),
                  )
                : store.listen(emit(snapshotRef, onChange)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps,
    )
    let get = () => snapshotRef.current

    return useSyncExternalStore(subscribe, get, get) as StoreValue<SomeStore>
}
