import React, { createContext, useState, useContext } from 'react'
import { WithChildren } from '../../types'

// output
type DarkModeContextOutput = [boolean | null, () => void, (bool: boolean) => void]

// input
interface WrapperProps extends WithChildren {
    initialState: boolean
}

export const DarkModeContext = createContext<DarkModeContextOutput>([
    false,
    () => undefined,
    () => undefined,
])
export default DarkModeContext

export const DarkModeConsumer = DarkModeContext.Consumer

const darkModeInLS = localStorage.getItem('darkMode') ?? ''

export function DarkModeProvider({
    initialState = darkModeInLS === 'true' ?? false,
    children,
}: WrapperProps) {
    const [darkMode, _setDarkMode] = useState<boolean>(initialState)

    function setDarkMode(value: boolean): void {
        _setDarkMode(!!value)
        localStorage.setItem('darkMode', `${!!value}`)
    }

    function switchDarkMode(): void {
        setDarkMode(!darkMode)
    }

    return (
        <DarkModeContext.Provider value={[darkMode ?? false, switchDarkMode, setDarkMode]}>
            {children}
        </DarkModeContext.Provider>
    )
}

export function useDarkModeContext() {
    return useContext<DarkModeContextOutput>(DarkModeContext)
}
