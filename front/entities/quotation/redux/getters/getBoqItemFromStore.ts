import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqBlock } from '../../types'

type Props = {
  itemIndex: number
}

export const getBoqItemFromStore = ({
  itemIndex,
}: Props): BoqBlock | undefined => {
  const item = getState().quotation.items[itemIndex]

  if (item?.type !== itemKey.boq) return

  return item
}
