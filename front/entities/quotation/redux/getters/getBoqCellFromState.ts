import type {
  Quotation,
  BoqRowCell,
  BoqRowCellKey,
} from '../../types'
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
}: Props): BoqRowCell | undefined => {
  const boqRow = getBoqRowFromState({ blockIndex, rowIndex, state })
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqRowCellKey]
  return boqRowCell
}
