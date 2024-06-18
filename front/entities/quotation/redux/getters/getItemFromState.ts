import { type Quotation, type Item } from '../../types'

type Props = {
  itemIndex: number
  state: Quotation
}

export const getItemFromState = ({
  itemIndex,
  state,
}: Props): Item | undefined => {
  const item = state.items[itemIndex]
  return item
}
