import type { BoqColWidth, BoqColumnKey, RootState } from 'client/shared/types'

type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectColumnWidth = ({ itemIndex, boqColumnKey }: Props) => (state: RootState): BoqColWidth => {
  const boqItem = state.items[itemIndex]
  if (boqItem?.type !== 'boq') return undefined
  const width = boqItem.boq.column[boqColumnKey].width
  return width
}
