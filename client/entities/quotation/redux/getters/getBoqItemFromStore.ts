import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqItem } from '../../types'

type Props = {
  itemIndex: number
}

export const getBoqItemFromStore = ({ itemIndex }: Props): BoqItem | undefined => {
  const item = getState().items[itemIndex]
  if (item?.type !== itemKey.boq) return
  return item
}
