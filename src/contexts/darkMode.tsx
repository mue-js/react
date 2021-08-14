import React, { createContext, useState } from 'react'
import { WithChildren } from '../types'

// output

// input
interface WrapperProps extends WithChildren {
    initialState: boolean | null
}

export const DarkModeContext = createContext([false, () => null, bool => null])
export default DarkModeContext

export const DarkModeConsumer = DarkModeContext.Consumer

const darkModeInLS = localStorage.getItem('darkMode') ?? ''

export function DarkModeProvider({
    initialState = darkModeInLS === 'true' ?? null,
    children,
}: WrapperProps) {
    const [darkMode, _setDarkMode] = useState<boolean | null>(initialState)

    function setDarkMode(value) {
        _setDarkMode(!!value)
        localStorage.setItem('darkMode', `${!!value}`)
    }

    function switchDarkMode() {
        setDarkMode(!darkMode)
    }

    return (
        <DarkModeContext.Provider value={[darkMode, switchDarkMode, setDarkMode]}>
            {children}
        </DarkModeContext.Provider>
    )
}
