import { itemType } from '../../const/itemType'
import type { BoqBlock } from '@root/shared/types/BlockItem'
import type { Quotation } from '@root/shared/types/Quotation'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getBoqBlockFromState = ({
  blockIndex,
  state,
}: Props): BoqBlock | undefined => {
  const block = state.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  return block
}
