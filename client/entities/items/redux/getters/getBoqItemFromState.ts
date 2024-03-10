import { itemKey } from '../../consts/itemKey'
import { type Item, type BoqItem } from '../../types'

type Props = {
  itemIndex: number
  state: Item[]
}

export const getBoqItemFromState = ({
  itemIndex,
  state,
}: Props): BoqItem | undefined => {
  const item = state[itemIndex]
  if (item?.type !== itemKey.boq) return
  return item
}
