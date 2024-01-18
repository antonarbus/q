import { getState } from '@libras/store'
import type { BoqHeaderCell, BoqHeaderKey } from '@shared/types'

type Props = {
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const getBoqHeaderFromStore = ({ itemIndex, boqHeaderKey }: Props): BoqHeaderCell | undefined => {
  const item = getState().items[itemIndex]
  if (!item) return
  if (item.type !== 'boq') return
  return item.boq.header[boqHeaderKey]
}
