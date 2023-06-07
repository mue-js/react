// types
import type { WithChildren } from '../../types'
import { MATERIAL_TYPES } from '../../enum'

// hooks
import useGridify, { GridifyProps } from '../../hooks/useGridify'

// utils
import { camelToSnake } from '../../utils/stringFormat'

// sass
import './index.scss'
import { cN } from '../../utils/classNames'

export type IconTypes = 'outlined' | 'two-tone' | 'round' | 'sharp'
export interface IconProps extends WithChildren, GridifyProps {
    icon?: string
    iconType?: IconTypes
    size?: string | number
    svg?: boolean
}

export default function Icon({ icon, iconType = 'round', size, svg = false, ...rest }: IconProps) {
    const { className, ...props } = useGridify({
        componentName: 'Icon',
        ...rest,
    })

    const iconFormatted = icon && camelToSnake(icon)

    const classNames = cN([
        className,
        `material-icons${MATERIAL_TYPES.includes(iconType) ? `-${iconType}` : ''}`,
        svg && iconFormatted,
        size,
    ])

    return (
        <i className={classNames} {...props}>
            {svg ? (
                <svg viewBox="0 0 512 512" className="svg-container">
                    <path className="svg-path" />
                </svg>
            ) : (
                iconFormatted
            )}
        </i>
    )
}
