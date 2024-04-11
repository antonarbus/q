import { signal } from '@preact/signals-react'
import { nanoid } from '../lib/nanoid'

export const reRenderQuotationSignal = signal(nanoid(5))
