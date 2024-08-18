import { signal } from '@preact/signals-react'

export const dragTooltipTextSignal = signal<'drag' | 'drop'>('drag')
