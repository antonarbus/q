import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'
import type { BoqRowCellKey } from '@entities/quotation/const/boqRowCellKey'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const getBoqCellHtmlFromStore = ({
  blockIndex,
  rowIndex,
  boqRowCellKey,
}: Props): string => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return ''
  }

  const row = block.boq.rows[rowIndex]

  if (row === undefined) {
    return ''
  }

  const { html } = row[boqRowCellKey]

  return html
}
