import { type Quotation, type BoqRow } from '../../types'
import { getBoqItemFromState } from './getBoqItemFromState'

type Props = {
  itemIndex: number
  rowIndex: number
  state: Quotation
}

export const getBoqRowFromState = ({
  itemIndex,
  rowIndex,
  state,
}: Props): BoqRow | undefined => {
  const boqItem = getBoqItemFromState({ itemIndex, state })
  if (boqItem === undefined) return
  const boqRow = boqItem.boq.rows[rowIndex]
  return boqRow
}
