import React, { PropsWithChildren } from 'react'

export interface Theme {
    toggle: boolean
    toggleTheme: () => void
}

export const ThemeContext = React.createContext<Theme | null>(null)

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const localTheme = window.localStorage.getItem('theme')

    const [toggle, setToggle] = React.useState(
        localTheme ? localTheme === 'true' : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    )

    const toggleTheme = () => {
        window.localStorage.setItem('theme', `${!toggle}`)

        setToggle(!toggle)
    }

    return <ThemeContext.Provider value={{ toggle, toggleTheme }}>{children}</ThemeContext.Provider>
}
