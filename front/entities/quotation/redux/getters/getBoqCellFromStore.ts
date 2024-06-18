import { type BoqRowCellKey, type BoqRowCell } from '../../types'
import { getBoqRowFromStore } from './getBoqRowFromStore'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const getBoqCellFromStore = ({
  itemIndex,
  rowIndex,
  boqRowCellKey,
}: Props): BoqRowCell | undefined => {
  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqRowCellKey]
  return boqRowCell
}
