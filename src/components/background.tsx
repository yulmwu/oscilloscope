import React from 'react'
import { Theme, ThemeContext } from '../context/theme'

export default () => {
    const { toggle } = React.useContext(ThemeContext) as Theme

    return <div className={`fixed w-[100vw] h-[100vh] ${toggle ? 'bg-background' : 'bg-background-light'}`} />
}
