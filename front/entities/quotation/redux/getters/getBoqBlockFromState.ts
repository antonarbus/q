import { itemKey } from '../../consts/itemKey'
import { type Quotation, type BoqBlock } from '../../types'

type Props = {
  itemIndex: number
  state: Quotation
}

export const getBoqBlockFromState = ({
  itemIndex,
  state,
}: Props): BoqBlock | undefined => {
  const block = state.blocks[itemIndex]
  if (block?.type !== itemKey.boq) return
  return block
}
