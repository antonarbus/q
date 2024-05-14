import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type Item, type BoqRow } from '../../types'
import { getBoqItemFromStore } from './getBoqItemFromStore'

type Props = {
  itemIndex: number
  rowIndex: number
  state?: Item[]
}

export const getBoqRowFromStore = ({
  itemIndex,
  rowIndex,
  state,
}: Props): BoqRow | undefined => {
  const item = getState().quotation.items[itemIndex]

  // todo: move item for edit modal into a different slice
  // special case for when the item is a row for item edit modal
  if (item?.type === itemKey.row) {
    return item
  }

  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return
  const boqRow = boqItem.boq.rows[rowIndex]
  return boqRow
}
