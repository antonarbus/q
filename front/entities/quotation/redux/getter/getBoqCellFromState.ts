import type { BoqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import type { Quotation, RowCell } from '../../type'
import { getBoqRowFromState } from './getBoqRowFromState'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
  state: Quotation
}

export const getBoqCellFromState = ({
  blockIndex,
  rowIndex,
  boqRowCellKey,
  state,
}: Props): RowCell | undefined => {
  const boqRow = getBoqRowFromState({ blockIndex, rowIndex, state })

  if (boqRow === undefined) {
    return
  }

  const boqRowCell = boqRow[boqRowCellKey]

  return boqRowCell
}
