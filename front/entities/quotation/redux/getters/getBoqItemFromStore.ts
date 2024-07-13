import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BlockBoq } from '../../types'

type Props = {
  itemIndex: number
}

export const getBoqItemFromStore = ({
  itemIndex,
}: Props): BlockBoq | undefined => {
  const item = getState().quotation.items[itemIndex]

  if (item?.type !== itemKey.boq) return

  return item
}
