import { type BoqRow } from 'client/shared/types'
import { type ItemsState } from '../itemsSlice'
import { getBoqItem } from './getBoqItem'

type Props = {
  itemIndex: number
  state?: ItemsState
}

export const getBoqRows = ({
  itemIndex,
  state,
}: Props): BoqRow[] | undefined => {
  const boqItem = getBoqItem({ itemIndex, state })
  if (boqItem === undefined) return
  const boqRows = boqItem.boq.rows
  return boqRows
}
