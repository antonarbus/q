import { itemKey } from '../../consts/itemKey'
import { type Quotation, type BoqBlock } from '../../types'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getBoqBlockFromState = ({
  blockIndex,
  state,
}: Props): BoqBlock | undefined => {
  const block = state.blocks[blockIndex]
  if (block?.type !== itemKey.boq) return
  return block
}
