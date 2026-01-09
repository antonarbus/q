import type { CellKey, Cell } from '@back/entity/quotation/schema'
import { getRowFromStore } from './getRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const getCellFromStore = (props: Props): Cell | undefined => {
  const row = getRowFromStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (row === undefined) {
    return
  }

  const cell = row[props.cellKey]

  return cell
}
