import React, { FC } from 'react'
// types
import type { WithChildren } from '../../types'

// hooks
import useGridify, { GridifyProps } from '../../hooks/useGridify'

// components
import ErrorBoundary from '../ErrorBoundary'

// sass
import './index.scss'

export interface GridifiedProps extends WithChildren, GridifyProps {
    fill?: boolean
    as?: keyof JSX.IntrinsicElements
    component?: FC<WithChildren & GridifyProps>
}

export const UncatchedGridified = ({
    as: As = 'div',
    componentName = 'Gridified',
    component: Component,
    children,
    fill = false,
    ...rest
}: GridifiedProps) => {
    const { className, height, width, ...props } = useGridify({
        ...rest,
        componentName,
    } as GridifyProps)

    const classNames = [className, fill && 'fill'].filter(Boolean).join(' ')

    // forced to do this because svg has mismatching height and width
    return Component ? (
        <Component className={classNames} height={height} width={width} {...props}>
            {typeof children === 'function' ? children() : children}
        </Component>
    ) : (
        <As className={classNames} {...props}>
            {typeof children === 'function' ? children() : children}
        </As>
    )
}

export default function Gridified(props: GridifiedProps) {
    return (
        <ErrorBoundary fallback="Houston, on a un problème" showDetails>
            <UncatchedGridified {...props} />
        </ErrorBoundary>
    )
}
