import { useState, useCallback, useEffect } from 'react'
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

    shouldTransmitProps?: boolean
    componentName?: string
}

export interface TransmissibleProps {
    col?: ResponsiveOrValue
    row?: ResponsiveOrValue
    width?: ResponsiveOrValue
    height?: ResponsiveOrValue
}

export interface ReturnProps extends TransmissibleProps {
    className: string
    style: CSSProperties
}

export function useGridify({
    col: defaultCol,
    row: defaultRow,
    width = 1,
    height = 1,
    fullWidth = false,
    fullHeight = false,

    className: currentClassName,
    style: currentStyle,
    position,
    justify,
    align,

    shouldTransmitProps,
    componentName,
}: GridifyProps): ReturnProps {
    const [className, setClassName] = useState<string>(currentClassName ?? '')
    const [style, setStyle] = useState<CSSProperties>(currentStyle ?? {})

    const [props, setProps] = useState<TransmissibleProps>({})

    const col = position === 'fixed' ? 0 : defaultCol
    const row = position === 'fixed' ? 0 : defaultRow

    const getCSSVar = useCallback(props => getCSSVarForDimension(props), [])

    useEffect(() => {
        setClassName(
            [
                camelToKebab(componentName ?? 'GridifiedElement'),
                currentClassName,
                justify && `justify-${justify}`,
                align && `align-${align}`,
                position,
            ]
                .filter(Boolean)
                .join(' '),
        )
    }, [currentClassName, componentName, justify, align, position])

    useEffect(() => {
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

                styles[`--col${suffix}`] =
                    col &&
                    getCSSVar({
                        dimension: col,
                        size,
                        defaultValue: 'auto',
                    })
                styles[`--row${suffix}`] =
                    row &&
                    getCSSVar({
                        dimension: row,
                        size,
                        defaultValue: 'auto',
                    })
                styles[`--width${suffix}`] = getCSSVar({
                    dimension: fullWidth ? -1 : width,
                    size,
                    defaultValue: 1,
                    getPrefix: (w: number) => w >= 0 && 'span ',
                })
                styles[`--height${suffix}`] = getCSSVar({
                    dimension: fullHeight ? -1 : height,
                    size,
                    defaultValue: 1,
                    getPrefix: (h: number) => h >= 0 && 'span ',
                })
            })
        }
        setStyle({ ...styles, ...currentStyle })
    }, [col, row, width, height, fullWidth, fullHeight, currentStyle, componentName])

    useEffect(() => {
        setProps(shouldTransmitProps ? { col, row, width, height } : {})
    }, [shouldTransmitProps, col, row, width, height])

    return { className, style, ...props }
}

export default useGridify
