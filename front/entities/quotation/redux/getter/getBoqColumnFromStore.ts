import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'
import type { Column } from '../../type'
import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnFromStore = ({
  blockIndex,
  boqColumnKey,
}: Props): Column | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  const column = block.boq.column[boqColumnKey]

  return column
}
