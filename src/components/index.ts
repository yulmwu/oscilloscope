import { PropsWithChildren } from 'react'

export { default as Background } from './background'
export { default as Text } from './text'

export type PropsBase = PropsWithChildren<{ className: string }>
