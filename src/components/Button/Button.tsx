import React, { ButtonHTMLAttributes } from 'react'

// types
import type { ColorsType, DirectionsType, IconSide, WithChildren } from '../../types'
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
    color?: ColorsType
    customColor?: ColorsType
    direction?: DirectionsType
    iconSide?: IconSide
    icon?: string
    padding?: string
    text?: string
    textClassName?: string
    size?: ButtonSize
}

function Button({
    aspect,
    children,
    color,
    customColor,
    direction,
    iconSide,
    icon,
    padding,
    size,
    text,
    textClassName,
    ...rest
}: ButtonProps) {
    const {
        className: gridClassName,
        style: gridStyle = {},
        ...props
    } = useGridify({
        componentName: 'Button',
        ...rest,
    })

    return (
        <button
            className={[
                gridClassName,
                `btn-${color && aspect !== 'filled' ? `${aspect}-${color}` : color ?? ''}`,
                icon && `btn-with-icon icon-${iconSide}`,
                `to-${DIRECTIONS.includes(direction) ? direction : 'bottom'}`,
            ]
                .filter(Boolean)
                .join(' ')}
            style={gridStyle}
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

Button.defaultProps = {
    aspect: 'filled',
    color: 'primary',
    direction: 'bottom',
    type: 'button',
    disabled: false,

    className: '',
    icon: null,
    iconSide: 'right',
    text: 'Button',
}

export default Button
