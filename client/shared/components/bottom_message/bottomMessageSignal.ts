import { signal } from '@preact/signals-react'

export const bottomMessage = signal('')

export const showBottomMessage = (msg: string): void => {
  bottomMessage.value = msg
}

export const hideBottomMessage = (): void => {
  bottomMessage.value = ''
}
