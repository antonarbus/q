import { itemType } from '../../const/itemType'
import type { Quotation, Boq } from '../../type'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getBoqBlockFromState = ({
  blockIndex,
  state,
}: Props): Boq | undefined => {
  const block = state.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  return block
}
