import { signal } from '@preact/signals-react'
import { nanoid } from '@shared/lib/nanoid'

export const reRenderQuotationSignal = signal(nanoid(3))
