import { itemKey } from '../../consts/itemKey'
import { type Quotation, type BoqRow } from '../../types'
import { getBoqBlockFromState } from './getBoqBlockFromState'

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
  // todo: move item for edit modal into a different slice
  // Special case for when the item is a row for item edit modal
  // If (state.items[0]?.type === itemKey.row) {
  //   Return state.items[0]
  // }

  const boqBlock = getBoqBlockFromState({ itemIndex, state })
  if (!boqBlock) return
  const boqRow = boqBlock.boq.rows[rowIndex]
  return boqRow
}
