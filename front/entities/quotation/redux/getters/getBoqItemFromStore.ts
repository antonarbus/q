import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type Boq } from '../../types'

type Props = {
  itemIndex: number
}

export const getBoqItemFromStore = ({ itemIndex }: Props): Boq | undefined => {
  const item = getState().quotation.items[itemIndex]

  if (item?.type !== itemKey.boq) return

  return item
}
