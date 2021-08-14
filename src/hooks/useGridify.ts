import { camelToKebab } from '../utils/stringFormat'
import { getCSSVarForDimension } from '../utils/gridify'

export type ResponsiveType = {
    xs: string | number
    sm: string | number
    md: string | number
    lg: string | number
    xl: string | number
    xxl: string | number
}

export type ResponsiveOrValue = string | number | ResponsiveType

export interface GridifyProps {
    col?: ResponsiveOrValue
    row?: ResponsiveOrValue
    width?: ResponsiveOrValue
    height?: ResponsiveOrValue
    fullWidth?: boolean
    fullHeight?: boolean

    className?: string
    style?: object
    position?: string
    justify?: string
    align?: string

    show?: boolean
    hide?: boolean

    shouldTransmitProps?: boolean
    componentName?: string
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
}: GridifyProps) {
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
        ;['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'].forEach((size) => {
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
                getPrefix: (wdth) => wdth >= 0 && 'span ',
            })
            styles[`--height${suffix}`] = getCSSVarForDimension({
                dimension: fullHeight ? -1 : height,
                size,
                defaultValue: 1,
                getPrefix: (hght) => hght >= 0 && 'span ',
            })
        })
    }

    const gridElementProps = shouldTransmitProps ? { col, row, width, height } : {}

    return {
        hide: !(show ?? true) || hide,

        className: [
            camelToKebab(type),
            className,
            justify && `justify-${justify}`,
            align && `align-${align}`,
            position,
        ]
            .filter((e) => !!e)
            .join(' '),
        style: { ...styles, ...style },
        ...gridElementProps,
    }
}

export default useGridify
