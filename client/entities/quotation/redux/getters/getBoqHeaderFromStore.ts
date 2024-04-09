import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqHeaderCell, type BoqHeaderKey } from '../../types'

type Props = {
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const getBoqHeaderFromStore = ({ itemIndex, boqHeaderKey }: Props): BoqHeaderCell | undefined => {
  const item = getState().items[itemIndex]
  if (!item) return
  if (item.type !== itemKey.boq) return
  return item.boq.header[boqHeaderKey]
}
