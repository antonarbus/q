import type { BoqColWidth, BoqColumnKey, RootState } from 'client/shared/types'
import { getBoqItem } from '../../utils/getBoqItem'

type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectColumnWidth = ({ itemIndex, boqColumnKey }: Props) => (state: RootState): BoqColWidth => {
  const boqItem = getBoqItem({ itemIndex })
  if (boqItem === undefined) return undefined
  const width = boqItem.boq.column[boqColumnKey].width
  return width
}
