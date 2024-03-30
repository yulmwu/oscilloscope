import React from 'react'
import { Theme, ThemeContext } from '../context/theme'
import { PropsBase } from './index'

interface Props extends Partial<PropsBase> {
    fontSize?: number | string
    stroke?: boolean
    color?: string
    uppercase?: boolean
}

export default (props: Props) => {
    const { toggle } = React.useContext(ThemeContext) as Theme

    const { fontSize, stroke, color, uppercase, className, children } = props

    console.log(color ?? (toggle ? 'text-white' : 'text-gray-800'))

    return (
        <p
            className={`${fontSize ?? 'text-9xl'} bg-transparent inline-block word-spacing ${
                stroke ? (toggle ? 'text-stroke' : 'text-stroke-light') : color ?? (toggle ? 'text-white' : 'text-gray-800')
            } ${className ?? ''}`}
        >
            {uppercase ? children?.toString().toUpperCase() : children}
        </p>
    )
}
