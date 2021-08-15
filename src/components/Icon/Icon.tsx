import React from 'react'

// types
import type { WithChildren } from '../../types'
import { MATERIAL_TYPES } from '../../enum'

// hooks
import useGridify, { GridifyProps } from '../../hooks/useGridify'

// utils
import { camelToSnake } from '../../utils/stringFormat'

// sass
import './index.scss'

export type IconTypes = 'outlined' | 'two-tone' | 'round' | 'sharp'
export interface IconProps extends WithChildren, GridifyProps {
    icon?: string
    iconType?: IconTypes
    size?: string | number
    svg?: boolean
}

export default function Icon({
    children,
    icon,
    iconType = 'round',
    size,
    svg = false,
    ...rest
}: IconProps) {
    const { className, ...props } = useGridify({
        componentName: 'Icon',
        ...rest,
    })

    const iconFormatted = camelToSnake(
        icon || (typeof children === 'function' ? children() : children),
    )

    const classNames = [
        className,
        `material-icons${MATERIAL_TYPES.includes(iconType) ? `-${iconType}` : ''}`,
        svg && iconFormatted,
        size,
    ]
        .filter(Boolean)
        .join(' ')

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
