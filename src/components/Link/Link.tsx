import React from 'react'
// types
import type { WithChildren, History } from '../../types'

import useGridify, { GridifyProps } from '../../hooks/useGridify'

export interface LinkProps extends WithChildren, GridifyProps {
    history: History
    to: string
}

export default function Link({ children, to, history, ...rest }: LinkProps) {
    const { className: gridClassName, ...props } = useGridify(rest as GridifyProps)

    return (
        <button
            onClick={() =>
                history?.push
                    ? history?.push(to)
                    : console.warn(`history?.push is not defined, can't push to ${to}`)
            }
            className={`${gridClassName ?? ''} pointer flex`.trim()}
            {...props}
        >
            {typeof children === 'function' ? children() : children}
        </button>
    )
}

Link.defaultProps = {
    componentName: 'Link',
}
