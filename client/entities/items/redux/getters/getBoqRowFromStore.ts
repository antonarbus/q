import { type Item, type BoqRow } from '@shared/types'
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
  // if we call func from reducer is should use own state which we pass here
  const boqItem = getBoqItemFromStore({ itemIndex, state })
  if (boqItem === undefined) return
  const boqRow = boqItem.boq.rows[rowIndex]
  return boqRow
}
