import type { CellKey } from '@back/entity/quotation/schema'
import { getState } from '@shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const getHtmlOfCellFromStoreByIndex = (props: Props): string => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return ''
  }

  const row = block.boq.rows[props.rowIndex]

  if (row === undefined) {
    return ''
  }

  const cell = row[props.cellKey]

  return cell.html
}
