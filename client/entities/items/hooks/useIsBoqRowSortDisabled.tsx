import { selectIsLastBoqRow, useItem } from '@entities/items'
import { useSelectorTyped } from '@shared/hooks'

export const useIsBoqRowSortDisabled = (): boolean => {
  const { itemIndex } = useItem()
  const isCopyContainer = useSelectorTyped(state => state.copy.isCopyContainer)
  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ itemIndex }))
  const isBoqRowSortDisabled = isCopyContainer || isLastBoqRow
  return isBoqRowSortDisabled
}
