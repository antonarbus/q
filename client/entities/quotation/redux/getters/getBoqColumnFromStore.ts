import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqCol, type BoqColumnKey } from '../../types'

type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnFromStore = ({ itemIndex, boqColumnKey }: Props): BoqCol | undefined => {
  const item = getState().quotation.items[itemIndex]

  if (!item) return
  if (item.type !== itemKey.boq) return

  const column = item.boq.column[boqColumnKey]
  return column
}
