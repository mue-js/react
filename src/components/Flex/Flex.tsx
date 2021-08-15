import React from 'react'

// types
import { WithChildren } from '../../types'

// hooks
import useGridify, { GridifyProps } from '../../hooks/useGridify'

// components
import ErrorBoundary from '../ErrorBoundary'

export interface FlexProps extends WithChildren, GridifyProps {
    column: boolean
    reverse: boolean
}

export function UncatchedFlex({ column = false, reverse = false, children, ...rest }: FlexProps) {
    const { className, ...props } = useGridify({
        componentName: 'Flex',
        ...rest,
    })

    return (
        <div
            className={[className, column && 'flex-column', reverse && 'reverse']
                .filter(Boolean)
                .join(' ')}
            {...props}
        >
            {typeof children === 'function' ? children() : children}
        </div>
    )
}

export const Flex = (props: FlexProps) => {
    return (
        <ErrorBoundary fallback="Houston, on a un problème" showDetails>
            <UncatchedFlex {...props} />
        </ErrorBoundary>
    )
}

export default Flex
