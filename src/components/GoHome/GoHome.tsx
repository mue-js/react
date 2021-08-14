import React, { CSSProperties } from 'react'
import type { History } from '../../types'

import useGridify, { GridifyProps } from '../../hooks/useGridify'

import Icon from '../Icon'
import Link from '../Link'

export interface GoHomeProps extends GridifyProps {
    btnClass?: string
    containerClassName?: string
    style?: CSSProperties
    label?: string
    history: History
}

export default function GoHome({
    btnClass = 'btn-primary',
    containerClassName,
    style,
    label,
    history,
    ...rest
}: GoHomeProps) {
    const { className, ...props } = useGridify({
        componentName: 'GoHome',
        ...rest,
    })

    return (
        <div className={`z-index-5 ${containerClassName ?? ''} ${className}`.trim()} {...props}>
            <Link
                to="/"
                className={`${btnClass} p-16 b-rad-50%`.trim()}
                style={style}
                history={history}
            >
                <Icon icon="home" />
                {label}
            </Link>
        </div>
    )
}
