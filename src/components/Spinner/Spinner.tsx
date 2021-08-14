import React from 'react'

import './index.scss'

export interface SpinnerProps {
    size: string
    color: string
}

export default function Spinner({ size, color = 'var(--secondary-color)' }: SpinnerProps) {
    return (
        <div className={['spinner', size].filter(Boolean).join(' ')} style={{ '--color': color }} />
    )
}
