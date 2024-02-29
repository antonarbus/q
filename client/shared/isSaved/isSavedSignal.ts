import { type Signal, signal } from '@preact/signals-react'
import { getDefaultOrLocalIsSaved } from './getDefaultOrLocalIsSaved'

export const isSavedSignal: Signal<boolean> = signal(getDefaultOrLocalIsSaved())
