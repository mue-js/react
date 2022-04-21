import { CSSProperties } from 'react'

import type { ResponsiveOrValue } from '../../types'

interface Data {
    value: ResponsiveOrValue
    size: string
}

interface Handlers {
    onNumber: (number: number, size?: string) => string
}

function handleReponsiveOrValue(data: Data, handlers?: Handlers) {
    const { value, size } = data
    const { onNumber } = handlers || {}

    if (value instanceof Object) {
        const trueValue = value?.[size]
        if (trueValue && trueValue !== 'auto') {
            return trueValue
        }
    } else if (size === 'xs' && value !== 'auto') {
        if (typeof value === 'number' && typeof onNumber === 'function') {
            return onNumber(value, size)
        } else {
            return value
        }
    }
}

export interface GetStyleProps {
    style: CSSProperties
    columns: ResponsiveOrValue
    rows: ResponsiveOrValue
    gap: ResponsiveOrValue
    colGap: ResponsiveOrValue
    rowGap: ResponsiveOrValue
}

export function getStyle({ style, columns, rows, gap, rowGap = gap, colGap = gap }: GetStyleProps) {
    const styles = {}

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
    sizes.forEach(size => {
        const suffix = size !== 'xs' ? `-${size}` : ''

        styles[`--template-columns${suffix}`] = handleReponsiveOrValue(
            {
                value: columns,
                size,
            },
            { onNumber: number => `repeat(${number}, 1fr)` },
        )

        styles[`--template-rows${suffix}`] = handleReponsiveOrValue(
            {
                value: rows,
                size,
            },
            { onNumber: number => `repeat(${number}, 1fr)` },
        )

        styles[`--col-gap${suffix}`] = handleReponsiveOrValue({
            value: colGap,
            size,
        })

        styles[`--row-gap${suffix}`] = handleReponsiveOrValue({
            value: rowGap,
            size,
        })
    })

    return { ...styles, ...style }
}
