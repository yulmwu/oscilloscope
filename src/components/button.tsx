import React from 'react'
import { PropsBase } from './index'

interface Props extends Partial<PropsBase> {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    fontSize?: number | string
}

export default (props: Props) => (
    <button className={`p-2 ${props.fontSize ?? ''} focus:outline-none ${props.className ?? ''}`} onClick={props.onClick}>
        {props.children}
    </button>
)
