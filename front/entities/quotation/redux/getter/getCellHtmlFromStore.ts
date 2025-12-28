import type { CellKey } from '@entities/quotation/const/cellKey'
import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const getCellHtmlFromStore = (props: Props): string => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== itemType.boq) {
    return ''
  }

  const row = block.boq.rows[props.rowIndex]

  if (row === undefined) {
    return ''
  }

  const cell = row[props.cellKey]

  return cell.html
}
