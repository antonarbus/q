import { signal } from '@preact/signals-react'
import { nanoid } from '@shared/lib/nanoid'

export const reRenderItemsSignal = signal(nanoid(3))
