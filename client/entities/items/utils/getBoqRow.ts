import { getState } from 'client/shared/clients'
import { type BoqRow } from 'client/shared/types'
import { type ItemsState } from '../redux/itemsSlice'

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
  // if we call it from reducer
  if (state !== undefined) {
    const item = state[itemIndex]
    if (item?.type !== 'boq') return
    const boqRow = item.boq.rows[rowIndex]
    return boqRow
  }

  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return
  const boqRow = item.boq.rows[rowIndex]
  return boqRow
}
