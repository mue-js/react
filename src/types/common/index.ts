import { ReactNode } from 'react'

export type WithChildren<T = {}> = T & { children?: ReactNode }

export type DirectionsType = 'top' | 'bottom' | 'left' | 'right'
export type IconSide = 'left' | 'right'
