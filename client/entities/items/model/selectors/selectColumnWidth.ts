import type { BoqColWidth, BoqCols, RootState } from 'client/shared/types'

interface Props {
  itemIndex: number
  headerName: keyof BoqCols
}

export const selectColumnWidth = ({ itemIndex, headerName }: Props) => (state: RootState): BoqColWidth => {
  const boqItem = state.items[itemIndex]
  if (boqItem?.type !== 'boq') return undefined
  return boqItem.boq.column[headerName].width
}
