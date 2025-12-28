import { itemType } from '../../const/itemType'
import type { BoqBlock } from '@root/shared/types/BlockItem'
import type { Quotation } from '@root/shared/types/Quotation'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getBoqBlockFromState = (props: Props): BoqBlock | undefined => {
  const block = props.state.blocks[props.blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  return block
}
