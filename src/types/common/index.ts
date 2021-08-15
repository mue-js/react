import { ReactNode } from 'react'

export interface WithChildren {
    children?: ReactNode
}

export type DirectionType = 'top' | 'bottom' | 'left' | 'right'
export type IconSide = 'left' | 'right'
