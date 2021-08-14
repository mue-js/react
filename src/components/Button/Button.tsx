import React, { ReactNode, ButtonHTMLAttributes } from 'react'
import type { ColorsType, DirectionsType, WithChildren } from '../../types'
import { DIRECTIONS } from '../../enum'

import useGridify from '../../hooks/useGridify'

import { Icon } from '../Icon'

import './index.scss'

type AspectMapType = {
    filled: string
    border: string
    text: string
    dropdown: string
}

export type ButtonAspect = 'filled' | 'border' | 'text' | 'dropdown'
export type IconSide = 'left' | 'right'
export type Size = 'small' | 'medium' | 'large'

export interface ButtonProps extends WithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
    aspect?: ButtonAspect
    className?: string
    color?: ColorsType
    customColor?: ColorsType
    direction?: DirectionsType
    iconSide?: IconSide
    icon?: string
    padding?: string
    text?: string
    textClassName?: string
    size?: Size
}

function Button({
    aspect,
    children,
    className,
    color,
    customColor,
    direction,
    iconSide,
    icon,
    padding,
    size,
    text,
    textClassName,
    ...otherProps
}: ButtonProps) {
    const {
        className: gridClassName,
        style: gridStyle = {},
        ...props
    } = useGridify({
        componentName: 'Button',
        ...otherProps,
    })

    const button = (
        <button
            className={[
                gridClassName,
                `btn-${color && aspect !== 'filled' ? `${aspect}-${color}` : color ?? ''}`,
                icon && `btn-with-icon icon-${iconSide}`,
                `to-${DIRECTIONS.includes(direction) ? direction : 'bottom'}`,
                className,
            ]
                .filter((e) => !!e)
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
