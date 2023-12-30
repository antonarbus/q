import { getState } from 'client/shared/clients'
import { type BoqItem } from 'client/shared/types'
import { type ItemsState } from '../redux/itemsSlice'

type Props = {
  itemIndex: number
  state?: ItemsState
}

export const getBoqItem = ({
  itemIndex,
  state,
}: Props): BoqItem | undefined => {
  // if we call it from reducer is own state is required
  if (state !== undefined) {
    const item = state[itemIndex]
    if (item?.type !== 'boq') return
    return item
  }

  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return
  return item
}
