import type { BoqColWidth, BoqCols, RootState } from 'client/shared/types'

type Props = {
  itemIndex: number
  boqColKey: keyof BoqCols
}

export const selectColumnWidth = ({ itemIndex, boqColKey }: Props) => (state: RootState): BoqColWidth => {
  const boqItem = state.items[itemIndex]
  if (boqItem?.type !== 'boq') return undefined
  return boqItem.boq.column[boqColKey].width
}
