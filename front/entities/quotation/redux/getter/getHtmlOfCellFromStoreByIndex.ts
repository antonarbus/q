import type { CellKey } from '@back/entity/quotation/schema'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const getHtmlOfCellFromStoreByIndex = (props: Props): string => {
  const block = reduxHolder.getState().quotation.blocks[props.blockIndex]

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
