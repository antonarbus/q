import { signal } from '@preact/signals-react'

export const accessTokenSignal = signal<null | string>(null)
