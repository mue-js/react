type ClassName = string | number | false | null | undefined

export const cN = (classNames: ClassName | ClassName[]) =>
    [classNames]?.flat?.()?.filter?.(Boolean)?.join?.(' ')
