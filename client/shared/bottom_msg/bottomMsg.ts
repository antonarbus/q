import { signal } from '@preact/signals-react'

export const bottomMsg = signal('')

export const showBottomMsg = (msg: string): void => {
  bottomMsg.value = msg
}

export const hideBottomMsg = (): void => {
  bottomMsg.value = ''
}
