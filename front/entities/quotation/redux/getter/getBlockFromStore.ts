import { getState } from '@shared/lib/redux'
import type { BlockItem } from '../../type'

type Props = {
  blockIndex: number
}

export const getBlockFromStore = ({
  blockIndex,
}: Props): BlockItem | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block === undefined) {
    return
  }

  return block
}
