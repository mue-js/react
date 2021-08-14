import React from 'react'
import type { WithChildren } from '../../types'

import Link, { LinkProps } from '../Link'
import ErrorBoundary from '../ErrorBoundary'

import './index.scss'

export interface CardProps extends WithChildren, LinkProps {
    backgroundColor: string
}

export function UncatchedCard({ backgroundColor, style, children, ...props }: CardProps) {
    return (
        <Link {...props}>
            <div className="card" style={{ ...style, '--card-bg': backgroundColor }}>
                {children}
            </div>
        </Link>
    )
}

export default function Card(props: CardProps) {
    return (
        <ErrorBoundary className="card" fallback="Houston, on a un problème" showDetails>
            <UncatchedCard {...props} />
        </ErrorBoundary>
    )
}
