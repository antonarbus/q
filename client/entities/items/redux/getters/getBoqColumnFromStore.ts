import { getState } from '@lib_instances/store'
import { type BoqCol, type BoqColumnKey } from '../../types'

type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnFromStore = ({ itemIndex, boqColumnKey }: Props): BoqCol | undefined => {
  const item = getState().items[itemIndex]
  if (!item) return
  if (item.type !== 'boq') return
  const column = item.boq.column[boqColumnKey]
  return column
}
