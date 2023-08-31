import type { BoqColWidth, BoqCols, RootState } from 'client/shared/types'

interface Props {
  index: number
  headerName: keyof BoqCols
}

export const selectColumnWidth = ({ index, headerName }: Props) => (state: RootState): BoqColWidth => {
  const boqItem = state.items[index]
  if (boqItem?.type !== 'boq') return undefined
  return boqItem.boq.column[headerName].width
}