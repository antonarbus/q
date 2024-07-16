import type { Item } from '@entities/quotation'
import { signal } from '@preact/signals-react'

export const bookmarkSignal = signal<Item | null>(null)
