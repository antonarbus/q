import type { CellKey } from '@entities/quotation/const/cellKey'
import type { RowCell } from '../../type'
import { getRowFromStore } from './getRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const getBoqCellFromStore = ({
  blockIndex,
  rowIndex,
  cellKey,
}: Props): RowCell | undefined => {
  const boqRow = getRowFromStore({ blockIndex, rowIndex })

  if (boqRow === undefined) {
    return
  }

  const cell = boqRow[cellKey]

  return cell
}
