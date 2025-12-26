import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'
import type { BoqBlock } from '../../types/BlockItem'

type Props = {
  blockIndex: number
}

export const getBoqBlockFromStore = ({
  blockIndex,
}: Props): BoqBlock | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  return block
}
