import type { RowCellKey, RowCell } from '../../types'
import { getBoqRowFromStore } from './getBoqRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: RowCellKey
}

export const getBoqCellFromStore = ({
  blockIndex,
  rowIndex,
  boqRowCellKey,
}: Props): RowCell | undefined => {
  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqRowCellKey]
  return boqRowCell
}
