import { type MutableRefObject } from 'react'

export const accessTokenRef: MutableRefObject<string | null> = {
  current: null,
}
