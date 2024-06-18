import {
  type Quotation,
  type BoqRowCell,
  type BoqRowCellKey,
} from '../../types'
import { getBoqRowFromState } from './getBoqRowFromState'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
  state: Quotation
}

export const getBoqCellFromState = ({
  itemIndex,
  rowIndex,
  boqRowCellKey,
  state,
}: Props): BoqRowCell | undefined => {
  const boqRow = getBoqRowFromState({ itemIndex, rowIndex, state })
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqRowCellKey]
  return boqRowCell
}
