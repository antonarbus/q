import type { Quotation, RowCell, RowCellKey } from '../../types'
import { getBoqRowFromState } from './getBoqRowFromState'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: RowCellKey
  state: Quotation
}

export const getBoqCellFromState = ({
  blockIndex,
  rowIndex,
  boqRowCellKey,
  state,
}: Props): RowCell | undefined => {
  const boqRow = getBoqRowFromState({ blockIndex, rowIndex, state })
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqRowCellKey]
  return boqRowCell
}
