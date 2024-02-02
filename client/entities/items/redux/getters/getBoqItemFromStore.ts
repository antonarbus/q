import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'
import { type BoqItem } from '../../types'

type Props = {
  itemIndex: number
}

export const getBoqItemFromStore = ({ itemIndex }: Props): BoqItem | undefined => {
  const item = getState().items[itemIndex]
  if (item?.type !== itemType.boq) return
  return item
}
