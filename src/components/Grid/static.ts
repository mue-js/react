import { CSSProperties } from 'react'

import type { ResponsiveOrValue } from '../../types'

interface HandlerProps {
    value: ResponsiveOrValue
    size: string
}

function handleReponsiveOrValue({ value, size }: HandlerProps) {
    if (value instanceof Object) {
        const trueValue = value?.[size]
        if (trueValue && trueValue !== 'auto') {
            return trueValue
        }
    } else if (['string', 'number'].includes(typeof value) && size === 'xs' && value !== 'auto') {
        return value
    }
}

export interface GetStyleProps {
    style: CSSProperties
    columnsTemplate: ResponsiveOrValue
    rowsTemplate: ResponsiveOrValue
    gap: ResponsiveOrValue
    colGap: ResponsiveOrValue
    rowGap: ResponsiveOrValue
}

export function getStyle({
    style,
    columnsTemplate,
    rowsTemplate,
    gap,
    rowGap = gap,
    colGap = gap,
}: GetStyleProps) {
    const styles = {}

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
    sizes.forEach((size) => {
        const suffix = size !== 'xs' ? `-${size}` : ''

        styles[`--template-columns${suffix}`] = handleReponsiveOrValue({
            value: columnsTemplate,
            size,
        })

        styles[`--template-rows${suffix}`] = handleReponsiveOrValue({
            value: rowsTemplate,
            size,
        })

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
