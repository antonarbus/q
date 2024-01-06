import { type BoqRow } from 'client/shared/types'
import { type ItemsState } from '../itemsSlice'
import { getBoqItem } from './getBoqItem'

type Props = {
  itemIndex: number
  rowIndex: number
  state?: ItemsState
}

export const getBoqRow = ({
  itemIndex,
  rowIndex,
  state,
}: Props): BoqRow | undefined => {
  // if we call func from reducer is should use own state which we pass here
  const boqItem = getBoqItem({ itemIndex, state })
  if (boqItem === undefined) return
  const boqRow = boqItem.boq.rows[rowIndex]
  return boqRow
}
