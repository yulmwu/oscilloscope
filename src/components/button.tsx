import React from 'react'
import { PropsBase } from './index'

interface Props extends Partial<PropsBase> {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    fontSize?: number | string
    ref?: React.RefObject<HTMLButtonElement>
}

export default React.forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>) => (
    <button className={`p-2 ${props.fontSize ?? ''} focus:outline-none ${props.className ?? ''}`} onClick={props.onClick} ref={ref}>
        {props.children}
    </button>
))
