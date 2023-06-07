// types
import type { WithChildren } from '../../types'

// components
import ErrorBoundary from '../ErrorBoundary'

// static
import { getStyle, GetStyleProps } from './static'

// sass
import './index.scss'
import { cN } from '../../utils/classNames'

export interface GridProps extends WithChildren, GetStyleProps {
    className: string
}

export function UncatchedGrid({ className, children, ...rest }: GridProps) {
    return (
        <div className={cN(['grid', className])} style={getStyle(rest as GetStyleProps)}>
            {children}
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
