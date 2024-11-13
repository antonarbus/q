import { itemType } from '../../consts/itemType'
import type { Quotation, Boq } from '../../types'

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
