import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnHtmlFromStore = (props: Props): string => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== itemType.boq) {
    return ''
  }

  const columnName = block.boq.column[props.boqColumnKey]

  return columnName.html
}
