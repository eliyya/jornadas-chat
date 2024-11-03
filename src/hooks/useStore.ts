import { listenKeys, Store, StoreValue } from 'nanostores'
import {
    useCallback,
    useRef,
    useSyncExternalStore,
    DependencyList,
    MutableRefObject,
} from 'react'

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
    /**
     * @default
     * ```ts
     * [store, options.keys]
     * ```
     */
    deps?: DependencyList

    /**
     * Will re-render components only on specific key changes.
     */
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
        deps,
    )
    let get = () => snapshotRef.current

    return useSyncExternalStore(subscribe, get, get) as StoreValue<SomeStore>
}
