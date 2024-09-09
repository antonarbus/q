import { signal } from '@preact/signals-react'
import { nanoid } from '@shared/lib/nanoid'

export const reLoadQuotationSignal = signal(nanoid(5))
