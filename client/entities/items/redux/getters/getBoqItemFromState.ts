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
  if (item?.type !== 'boq') return
  return item
}
