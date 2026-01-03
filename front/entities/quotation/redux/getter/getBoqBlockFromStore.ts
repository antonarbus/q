import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'
import type { BoqBlock } from '@back/entities/quotation/quotationSchema'

type Props = {
  blockIndex: number
}

export const getBoqBlockFromStore = (props: Props): BoqBlock | undefined => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  return block
}
