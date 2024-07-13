import { type Quotation, type BoqRow } from '../../types'
import { getBoqItemFromState } from './getBoqItemFromState'

type Props = {
  itemIndex: number
  state: Quotation
}

export const getBoqRowsFromState = ({
  itemIndex,
  state,
}: Props): BoqRow[] | undefined => {
  const boqItem = getBoqItemFromState({ itemIndex, state })
  if (boqItem === undefined) return
  const boqRows = boqItem.boq.rows
  return boqRows
}
