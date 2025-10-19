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
  const row = getRowFromStore({ blockIndex, rowIndex })

  if (row === undefined) {
    return
  }

  const cell = row[cellKey]

  return cell
}
