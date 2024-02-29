import { type Signal, signal } from '@preact/signals-react'
import { getDefaultOrLocalIsSaved } from '../utils/getDefaultOrLocalIsSaved'

export const isSavedSignal: Signal<boolean> = signal(getDefaultOrLocalIsSaved())
