import { getState } from '@libras/store'
import { type BoqItem } from '@shared/types'

type Props = {
  itemIndex: number
}

export const getBoqItemFromStore = ({ itemIndex }: Props): BoqItem | undefined => {
  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return
  return item
}
