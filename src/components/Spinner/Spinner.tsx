import React from 'react'

import './index.scss'

export function Spinner({ size, color = 'var(--secondary-color)' }) {
    return (
        <div className={['spinner', size].filter(Boolean).join(' ')} style={{ '--color': color }} />
    )
}

export default Spinner
