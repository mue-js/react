import { ReactNode } from 'react'
import { DIRECTIONS } from '../enum'

export type WithChildren<T = {}> = T & { children?: ReactNode }

export type DirectionsType = typeof DIRECTIONS

export * from './colors'
