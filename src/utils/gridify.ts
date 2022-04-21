import type { ResponsiveOrValue } from './../types'

export interface GetCSSVarForDimensionProps {
    dimension: ResponsiveOrValue
    size: string
    defaultValue: string | number
    getPrefix?: (dim: string | number) => false | string
}

export const getCSSVarForDimension = ({
    dimension,
    size,
    defaultValue,
    getPrefix = () => '',
}: GetCSSVarForDimensionProps): string | undefined => {
    if (dimension instanceof Object) {
        const dimensionForSize = dimension?.[size]
        if (dimensionForSize && dimensionForSize !== defaultValue) {
            const prefix = getPrefix(dimensionForSize)
            return prefix ? `${prefix}${dimensionForSize}` : String(dimensionForSize)
        }
    } else if (
        ['string', 'number'].includes(typeof dimension) &&
        size === 'xs' &&
        dimension !== defaultValue
    ) {
        const prefix = getPrefix(dimension)
        return prefix ? `${prefix}${dimension}` : String(dimension)
    }

    return undefined
}
