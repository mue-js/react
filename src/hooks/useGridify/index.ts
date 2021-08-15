// types
import type { CSSProperties } from 'react'
import type { ResponsiveOrValue } from '../../types'

// utils
import { camelToKebab } from '../../utils/stringFormat'
import { getCSSVarForDimension } from '../../utils/gridify'

export interface GridifyProps {
    col?: ResponsiveOrValue
    row?: ResponsiveOrValue
    width?: ResponsiveOrValue
    height?: ResponsiveOrValue
    fullWidth?: boolean
    fullHeight?: boolean

    className?: string
    style?: CSSProperties
    position?: string
    justify?: string
    align?: string

    show?: boolean
    hide?: boolean

    shouldTransmitProps?: boolean
    componentName?: string
}

export interface ReturnProps {
    className: string
    hide: boolean
    style: object
    col?: ResponsiveOrValue
    row?: ResponsiveOrValue
    width?: ResponsiveOrValue
    height?: ResponsiveOrValue
}

function useGridify({
    col: defaultCol,
    row: defaultRow,
    width = 1,
    height = 1,
    fullWidth = false,
    fullHeight = false,

    className,
    style,
    position,
    justify,
    align,

    show,
    hide,

    shouldTransmitProps,
    componentName,
}: GridifyProps): ReturnProps {
    const col = position === 'fixed' ? 0 : defaultCol
    const row = position === 'fixed' ? 0 : defaultRow

    const type = componentName || 'GridifiedElement'

    // css variables
    const styles = {}
    if (
        !(width instanceof Object) &&
        parseInt(`${width}`, 10) <= 0 &&
        !(height instanceof Object) &&
        parseInt(`${height}`, 10) <= 0
    ) {
        styles['display'] = 'none'
    } else {
        ;['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'].forEach(size => {
            const suffix = size !== 'xs' ? `-${size}` : ''

            styles[`--col${suffix}`] = getCSSVarForDimension({
                dimension: col,
                size,
                defaultValue: 'auto',
            })
            styles[`--row${suffix}`] = getCSSVarForDimension({
                dimension: row,
                size,
                defaultValue: 'auto',
            })
            styles[`--width${suffix}`] = getCSSVarForDimension({
                dimension: fullWidth ? -1 : width,
                size,
                defaultValue: 1,
                getPrefix: wdth => wdth >= 0 && 'span ',
            })
            styles[`--height${suffix}`] = getCSSVarForDimension({
                dimension: fullHeight ? -1 : height,
                size,
                defaultValue: 1,
                getPrefix: hght => hght >= 0 && 'span ',
            })
        })
    }

    return {
        hide: !(show ?? true) || hide,

        className: [
            camelToKebab(type),
            className,
            justify && `justify-${justify}`,
            align && `align-${align}`,
            position,
        ]
            .filter(Boolean)
            .join(' '),
        style: { ...styles, ...style },
        ...(shouldTransmitProps ? { col, row, width, height } : {}),
    }
}

export default useGridify
