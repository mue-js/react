import { useCallback, useMemo, useState } from 'react'

type TypeWithId = {
    id: string
}

export interface ActionsType<T> {
    setValue: React.Dispatch<React.SetStateAction<(T & TypeWithId)[]>>
    add: (a: T & TypeWithId) => void
    unshift: (a: T & TypeWithId) => void
    push: (a: T & TypeWithId) => void
    move: (from: T & TypeWithId, to: T & TypeWithId) => void
    clear: () => void
    removeBy: (value: T & TypeWithId, prop: T & TypeWithId) => void
    removeById: (id: T & TypeWithId) => void
    removeIndex: (index: T & TypeWithId) => void
    pop: () => void
    shift: () => void
    modifyById: (id: T & TypeWithId, newValue: T & TypeWithId) => void
}

export function useArray<T>(
    initial: (T & TypeWithId)[],
): [(T & TypeWithId)[], ActionsType<T & TypeWithId>] {
    const [value, setValue] = useState(initial)

    const push = useCallback(a => {
        setValue((arr: (T & TypeWithId)[]) => [...arr, ...(Array.isArray(a) ? a : [a])])
    }, [])
    const unshift = useCallback(
        a => setValue((arr: (T & TypeWithId)[]) => [...(Array.isArray(a) ? a : [a]), ...arr]),
        [],
    )
    const pop = useCallback(() => setValue((arr: (T & TypeWithId)[]) => arr.slice(0, -1)), [])
    const shift = useCallback(() => setValue((arr: (T & TypeWithId)[]) => arr.slice(1)), [])
    const move = useCallback(
        (from, to) =>
            setValue((arr: (T & TypeWithId)[]) => {
                const copy = arr.slice()
                copy.splice(to < 0 ? copy.length + to : to, 0, copy.splice(from, 1)[0])
                return copy
            }),
        [],
    )
    const clear = useCallback(() => setValue(() => []), [])
    const removeById = useCallback(
        // @ts-ignore not every array that you will pass down will have object with id field.
        id =>
            setValue((arr: (T & TypeWithId)[]) =>
                arr && arr.length ? arr?.filter((v: T & TypeWithId) => v && v.id !== id) : arr,
            ),
        [],
    )
    const removeBy = useCallback(
        // @ts-ignore not every array that you will pass down will have object with prop field.
        (value, prop) =>
            setValue((arr: (T & TypeWithId)[]) =>
                arr && arr.length
                    ? arr?.filter((v: T & TypeWithId) => v && v?.[prop] !== value)
                    : arr,
            ),
        [],
    )
    const removeIndex = useCallback(
        index =>
            setValue((arr: (T & TypeWithId)[]) => {
                const copy = arr.slice()
                copy.splice(index, 1)
                return copy
            }),
        [],
    )
    const modifyById = useCallback(
        (id, newValue) =>
            // @ts-ignore not every array that you will pass down will have object with id field.
            setValue((arr: (T & TypeWithId)[]) =>
                arr.map((item: T & TypeWithId) =>
                    item.id === id ? Object.assign(Object.assign({}, item), newValue) : item,
                ),
            ),
        [],
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
        [push, unshift, move, clear, removeBy, removeById, removeIndex, pop, shift],
    )
    return [value, actions]
}

export default useArray
