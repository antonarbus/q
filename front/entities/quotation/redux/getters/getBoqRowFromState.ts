import { itemKey } from '../../consts/itemKey'
import { type Quotation, type Row } from '../../types'
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
}: Props): Row | undefined => {
  // todo: move item for edit modal into a different slice
  // special case for when the item is a row for item edit modal
  if (state.items[0]?.type === itemKey.row) {
    return state.items[0]
  }

  const boqItem = getBoqItemFromState({ itemIndex, state })
  if (boqItem === undefined) return
  const boqRow = boqItem.boq.rows[rowIndex]
  return boqRow
}
