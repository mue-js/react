import React from 'react'
// types
import type { WithChildren } from '../../types'

// components
import ErrorBoundary from '../ErrorBoundary'

// static
import { getStyle, GetStyleProps } from './static'

// sass
import './index.scss'

export interface GridProps extends WithChildren, GetStyleProps {
    className: string
}

export function UncatchedGrid({ className, children, ...rest }: GridProps) {
    return (
        <div
            className={['grid', className].filter(Boolean).join(' ')}
            style={getStyle(rest as GetStyleProps)}
        >
            {typeof children === 'function' ? children() : children}
        </div>
    )
}

export default function Grid(props: GridProps) {
    return (
        <ErrorBoundary fallback="Houston, on a un problème" showDetails>
            <UncatchedGrid {...props} />
        </ErrorBoundary>
    )
}
