import { getState } from '@lib_instances/store'
import { type Item } from '../../types'

type Props = {
  itemIndex: number
}

export const getItemFromStore = ({ itemIndex }: Props): Item | undefined => {
  const item = getState().items[itemIndex]
  if (item === undefined) return
  return item
}
