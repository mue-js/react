import React, { ButtonHTMLAttributes } from 'react'

// types
import type { DirectionType, IconSide, WithChildren } from '../../types'
import { DIRECTIONS } from '../../enum'

// hooks
import useGridify, { GridifyProps } from '../../hooks/useGridify'

// components
import Icon from '../Icon'

// sass
import './index.scss'

export type ButtonAspect = 'filled' | 'border' | 'text'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps
    extends WithChildren,
        GridifyProps,
        ButtonHTMLAttributes<HTMLButtonElement> {
    aspect?: ButtonAspect
    color?: string
    customColor?: string
    direction?: DirectionType
    iconSide?: IconSide
    icon?: string
    padding?: string
    text?: string
    textClassName?: string
    size?: ButtonSize
}

export default function Button({
    aspect = 'filled',
    children,
    color = 'primary',
    customColor,
    direction = 'bottom',
    iconSide = 'right',
    icon = null,
    padding,
    size,
    text,
    textClassName,
    type = 'button',
    ...rest
}: ButtonProps) {
    const {
        className,
        style: gridStyle = {},
        ...props
    } = useGridify({
        componentName: 'Button',
        ...rest,
    })

    return (
        <button
            className={[
                className,
                `btn-${color && aspect !== 'filled' ? `${aspect}-${color}` : color ?? ''}`,
                icon && `btn-with-icon icon-${iconSide}`,
                `to-${DIRECTIONS.includes(direction) ? direction : 'bottom'}`,
            ]
                .filter(Boolean)
                .join(' ')}
            style={gridStyle}
            type={type}
            {...props}
        >
            {!children && (
                <span
                    className={`flex align-items-center justify-center ${
                        iconSide === 'left' ? 'flex-reverse' : ''
                    }`}
                >
                    {text}

                    {icon && (typeof icon === 'string' ? <Icon icon={icon} /> : icon)}
                </span>
            )}
            {children && typeof children === 'function' ? children() : children}
        </button>
    )
}
