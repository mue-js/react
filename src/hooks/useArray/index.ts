import { useCallback, useMemo, useState } from 'react'

type TypeWithId = {
    id: string
}

export interface ActionsType<T> {
    setValue: React.Dispatch<React.SetStateAction<(T & TypeWithId)[]>>
    add: (a: T & TypeWithId) => void
    unshift: (a: T & TypeWithId) => void
    push: (a: T & TypeWithId) => void
    move: (from: number, to: number) => void
    clear: () => void
    removeBy: (value: T & TypeWithId, prop: T & TypeWithId) => void
    removeById: (id: number | string) => void
    removeIndex: (index: number) => void
    pop: () => void
    shift: () => void
    modifyById: (id: number | string, newValue: T & TypeWithId) => void
}

export function useArray<T>(
    initial: (T & TypeWithId)[],
): [(T & TypeWithId)[], ActionsType<T & TypeWithId>] {
    const [value, setValue] = useState(initial)

    const push = useCallback((a: (T & TypeWithId) | (T & TypeWithId)[]) => {
        setValue((arr: (T & TypeWithId)[]) => [...arr, ...(Array.isArray(a) ? a : [a])])
    }, [])
    const unshift = useCallback(
        (a: (T & TypeWithId) | (T & TypeWithId)[]) =>
            setValue((arr: (T & TypeWithId)[]) => [...(Array.isArray(a) ? a : [a]), ...arr]),
        [],
    )
    const pop = useCallback(() => setValue((arr: (T & TypeWithId)[]) => arr.slice(0, -1)), [])
    const shift = useCallback(() => setValue((arr: (T & TypeWithId)[]) => arr.slice(1)), [])
    const move = useCallback(
        (from: number, to: number) =>
            setValue((arr: (T & TypeWithId)[]) => {
                const copy = arr.slice()
                copy.splice(to < 0 ? copy.length + to : to, 0, copy.splice(from, 1)[0])
                return copy
            }),
        [],
    )
    const clear = useCallback(() => setValue(() => []), [])
    const removeById = useCallback(
        (id: number | string) =>
            setValue((arr: (T & TypeWithId)[]) =>
                arr && arr.length
                    ? arr?.filter((v: T & TypeWithId) => v && String(v.id) !== String(id))
                    : arr,
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
        (index: number) =>
            setValue((arr: (T & TypeWithId)[]) => {
                const copy = arr.slice()
                copy.splice(index, 1)
                return copy
            }),
        [],
    )
    const modifyById = useCallback(
        (id: number | string, newValue: T & TypeWithId) =>
            // @ts-ignore not every array that you will pass down will have object with id field.
            setValue((arr: (T & TypeWithId)[]) =>
                arr.map((item: T & TypeWithId) =>
                    String(item.id) === String(id)
                        ? Object.assign(Object.assign({}, item), newValue)
                        : item,
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
