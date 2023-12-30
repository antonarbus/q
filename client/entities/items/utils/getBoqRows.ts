import { getState } from 'client/shared/clients'
import { type BoqRow } from 'client/shared/types'
import { type ItemsState } from '../redux/itemsSlice'

type Props = {
  itemIndex: number
  state?: ItemsState
}

export const getBoqRows = ({
  itemIndex,
  state,
}: Props): BoqRow[] | undefined => {
  // if we call it from reducer
  if (state !== undefined) {
    const item = state[itemIndex]
    if (item?.type !== 'boq') return
    const boqRows = item.boq.rows
    return boqRows
  }

  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return
  const boqRows = item.boq.rows
  return boqRows
}
