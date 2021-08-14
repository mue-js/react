import React, { FC } from 'react'
// types
import type { WithChildren } from '../../types'

// hooks
import useGridify, { GridifyProps } from '../../hooks/useGridify'

// components
import { ErrorBoundary } from '../ErrorBoundary'

// sass
import './index.scss'

const defaultProps = {
    componentName: 'Gridified',
    fill: false,
    as: 'div',
    component: undefined,
}

export interface GridifiedProps extends WithChildren, GridifyProps {
    fill?: boolean
    as?: keyof JSX.IntrinsicElements
    component?: FC<WithChildren & GridifyProps>
}

export const UncatchedGridified = ({
    as: As,
    component: Component,
    children,
    fill,
    ...rest
}: GridifiedProps) => {
    const { className: gridClassName, height, width, ...props } = useGridify(rest)

    const classNames = [gridClassName, fill && 'fill'].filter(Boolean).join(' ')

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

UncatchedGridified.defaultProps = defaultProps

export default function Gridified(props: GridifiedProps) {
    return (
        <ErrorBoundary fallback="Houston, on a un problème" showDetails>
            <UncatchedGridified {...props} />
        </ErrorBoundary>
    )
}

Gridified.defaultProps = {
    componentName: 'Gridified',
    fill: false,
    type: 'div',
}
