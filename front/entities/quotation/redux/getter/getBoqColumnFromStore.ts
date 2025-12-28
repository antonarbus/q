import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'
import type { Column } from '@root/shared/types/BlockItem'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnFromStore = (props: Props): Column | undefined => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  const column = block.boq.column[props.boqColumnKey]

  return column
}
