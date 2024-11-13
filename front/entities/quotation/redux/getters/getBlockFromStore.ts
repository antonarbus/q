import { getState } from '@shared/lib/redux'
import type { Item } from '../../types'

type Props = {
  blockIndex: number
}

export const getBlockFromStore = ({ blockIndex }: Props): Item | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block === undefined) {
    return
  }

  return block
}
