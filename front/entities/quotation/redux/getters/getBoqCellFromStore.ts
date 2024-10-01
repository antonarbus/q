import type { BoqRowCellKey } from '@entities/quotation/consts/boqRowCellKey'
import type { RowCell } from '../../types'
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
}: Props): RowCell | undefined => {
  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqRowCellKey]
  return boqRowCell
}
