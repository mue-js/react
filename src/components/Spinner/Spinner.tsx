import { cN } from '../../utils/classNames'

import './index.scss'

export interface SpinnerProps {
    size: string
    color: string
}

export default function Spinner({ size, color = 'var(--secondary-color)' }: SpinnerProps) {
    return <div className={cN(['spinner', size])} style={{ '--color': color }} />
}
