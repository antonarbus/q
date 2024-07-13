import { itemKey } from '../../consts/itemKey'
import { type Quotation, type BlockBoq } from '../../types'

type Props = {
  itemIndex: number
  state: Quotation
}

export const getBoqItemFromState = ({
  itemIndex,
  state,
}: Props): BlockBoq | undefined => {
  const item = state.items[itemIndex]
  if (item?.type !== itemKey.boq) return
  return item
}
