import { getState } from '@shared/clients'
import { type BoqItem } from '@shared/types'
import { type ItemsState } from '../itemsSlice'

type Props = {
  itemIndex: number
  state?: ItemsState
}

export const getBoqItemFromStore = ({
  itemIndex,
  state,
}: Props): BoqItem | undefined => {
  // if we call func from reducer is should use own state which we pass here
  const item = (state === undefined) ? getState().items[itemIndex] : state[itemIndex]
  if (item?.type !== 'boq') return
  return item
}
