import { type BoqRowCellKey, type BoqRowCell } from '../../types'
import { getBoqRowFromStore } from './getBoqRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const getBoqCellFromStore = ({
  blockIndex,
  rowIndex,
  boqRowCellKey,
}: Props): BoqRowCell | undefined => {
  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqRowCellKey]
  return boqRowCell
}
