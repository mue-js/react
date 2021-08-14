import { ReactNode } from 'react'

export type WithChildren<T = {}> = T & { children?: ReactNode }

export type DirectionType = 'top' | 'bottom' | 'left' | 'right'
export type IconSide = 'left' | 'right'
