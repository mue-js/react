import { FC, ButtonHTMLAttributes } from 'react'

// types
import type { DirectionType, IconSide, WithChildren } from '../../types'
import { DIRECTIONS } from '../../enum'
import { cN } from '../../utils/classNames'

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
    direction?: DirectionType
    iconSide?: IconSide
    icon?: string
    padding?: string
    text?: string
    textClassName?: string
    size?: ButtonSize
}

const Button: FC<ButtonProps> = ({
    aspect = 'filled',
    children,
    color = 'primary',
    direction = 'bottom',
    icon = undefined,
    iconSide = 'right',
    text,
    textClassName,
    type = 'button',
    ...rest
}) => {
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
            className={cN([
                className,
                `btn-${color && aspect !== 'filled' ? `${aspect}-${color}` : color ?? ''}`,
                icon && `btn-with-icon icon-${iconSide}`,
                `to-${DIRECTIONS.includes(direction) ? direction : 'bottom'}`,
            ])}
            style={gridStyle}
            type={type}
            {...props}
        >
            {!children && (
                <span
                    className={cN([
                        'flex align-items-center justify-center',
                        iconSide === 'left' && 'flex-reverse',
                        textClassName,
                    ])}
                >
                    {text}

                    {icon && (typeof icon === 'string' ? <Icon icon={icon} /> : icon)}
                </span>
            )}
            {children}
        </button>
    )
}

export default Button
