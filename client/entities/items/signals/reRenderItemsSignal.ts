import { signal } from '@preact/signals-react'
import { nanoid } from 'nanoid'

export const reRenderItemsSignal = signal(nanoid(3))
