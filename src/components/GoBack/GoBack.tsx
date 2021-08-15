import React, { CSSProperties } from 'react'
import type { History } from '../../types'

import useGridify, { GridifyProps } from '../../hooks/useGridify'

import Icon from '../Icon'
import Link from '../Link'

export interface GoBackProps extends GridifyProps {
    btnClass?: string
    containerClassName?: string
    style?: CSSProperties
    label?: string
    history: History
}

export default function GoBack({ style, to, label, history, ...rest }) {
    function handleClick() {
        if (history?.goBack) {
            history.goBack()
        } else {
            console.warn('history?.goBack is not defined, could not go to previous page')
        }
    }
    const { className, ...props } = useGridify({
        componentName: 'GoBack',
        ...rest,
    })

    const cN = `btn-primary p-16 b-rad-50% ${className ?? ''}`.trim()

    return (
        <div className={`z-index-5 ${className ?? ''}`.trim()} {...props}>
            {to ? (
                <Link className={cN} to={to} history={history} style={style}>
                    <Icon icon="arrow_left" />
                    {label}
                </Link>
            ) : (
                <button className={cN} onClick={handleClick} type="button" style={style}>
                    <Icon icon="arrow_left" />
                    {label}
                </button>
            )}
        </div>
    )
}
