import type { CellKey } from '@entities/quotation/const/cellKey'
import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const getBoqCellHtmlFromStore = ({
  blockIndex,
  rowIndex,
  cellKey,
}: Props): string => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return ''
  }

  const row = block.boq.rows[rowIndex]

  if (row === undefined) {
    return ''
  }

  const { html } = row[cellKey]

  return html
}
