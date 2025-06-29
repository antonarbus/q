import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'
import type { Boq } from '../../type'

type Props = {
  blockIndex: number
}

export const getBoqBlockFromStore = ({
  blockIndex,
}: Props): Boq | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  return block
}
