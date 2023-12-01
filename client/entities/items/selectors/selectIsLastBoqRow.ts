import type { RootState } from 'client/shared/types'

type Props = {
  itemIndex: number
}

export const selectIsLastBoqRow = ({ itemIndex }: Props) => (state: RootState): boolean => {
  const item = state.items[itemIndex]

  if (item?.type !== 'boq') return false

  const boqRows = item.boq.rows
  const isBoqRowAlone = boqRows.length === 1

  return isBoqRowAlone
}
