import { itemKey } from '../../consts/itemKey'
import { type Quotation, type ItemBoq } from '../../types'

type Props = {
  itemIndex: number
  state: Quotation
}

export const getBoqItemFromState = ({
  itemIndex,
  state,
}: Props): ItemBoq | undefined => {
  const item = state.items[itemIndex]
  if (item?.type !== itemKey.boq) return
  return item
}
