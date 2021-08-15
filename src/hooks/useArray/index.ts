import { useCallback, useMemo, useState } from 'react'

export function useArray<T>(initial: T[]): [T[], any] {
    const [value, setValue] = useState(initial)

    const push = useCallback(a => {
        setValue((arr: T[]) => [...arr, ...(Array.isArray(a) ? a : [a])])
    }, [])
    const unshift = useCallback(
        a => setValue((arr: T[]) => [...(Array.isArray(a) ? a : [a]), ...arr]),
        []
    )
    const pop = useCallback(() => setValue((arr: T[]) => arr.slice(0, -1)), [])
    const shift = useCallback(() => setValue((arr: T[]) => arr.slice(1)), [])
    const move = useCallback(
        (from, to) =>
            setValue((arr: T[]) => {
                const copy = arr.slice()
                copy.splice(
                    to < 0 ? copy.length + to : to,
                    0,
                    copy.splice(from, 1)[0]
                )
                return copy
            }),
        []
    )
    const clear = useCallback(() => setValue(() => []), [])
    const removeById = useCallback(
        // @ts-ignore not every array that you will pass down will have object with id field.
        id =>
            setValue((arr: T[]) =>
                arr && arr.length
                    ? arr?.filter((v: any) => v && v.id !== id)
                    : arr
            ),
        []
    )
    const removeBy = useCallback(
        // @ts-ignore not every array that you will pass down will have object with prop field.
        (value, prop) =>
            setValue((arr: T[]) =>
                arr && arr.length
                    ? arr?.filter((v: any) => v && v?.[prop] !== value)
                    : arr
            ),
        []
    )
    const removeIndex = useCallback(
        index =>
            setValue((arr: T[]) => {
                const copy = arr.slice()
                copy.splice(index, 1)
                return copy
            }),
        []
    )
    const modifyById = useCallback(
        (id, newValue) =>
            // @ts-ignore not every array that you will pass down will have object with id field.
            setValue((arr: T[]) =>
                arr.map((item: any) =>
                    item.id === id
                        ? Object.assign(Object.assign({}, item), newValue)
                        : item
                )
            ),
        []
    )
    const actions = useMemo(
        () => ({
            setValue,
            add: push,
            unshift,
            push,
            move,
            clear,
            removeBy,
            removeById,
            removeIndex,
            pop,
            shift,
            modifyById,
        }),
        [
            push,
            unshift,
            move,
            clear,
            removeBy,
            removeById,
            removeIndex,
            pop,
            shift,
        ]
    )
    return [value, actions]
}

export default useArray
