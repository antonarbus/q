import { itemKey } from '../../consts/itemKey'
import { type Quotation, type BoqItem } from '../../types'

type Props = {
  itemIndex: number
  state: Quotation
}

export const getBoqItemFromState = ({
  itemIndex,
  state,
}: Props): BoqItem | undefined => {
  const item = state.items[itemIndex]
  if (item?.type !== itemKey.boq) return
  return item
}
