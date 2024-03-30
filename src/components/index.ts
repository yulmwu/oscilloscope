import { PropsWithChildren } from 'react'

export { default as Background } from './background'
export { default as Text } from './text'
export { default as Button } from './button'
export { default as Oscilloscope } from './oscilloscope'

export type PropsBase = PropsWithChildren<{ className: string }>
