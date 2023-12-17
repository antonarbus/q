import { selectIsLastBoqRow } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import { useItemIndex } from 'client/widgets/items/ItemIndexProvider'

export const useIsBoqRowSortDisabled = (): boolean => {
  const { itemIndex } = useItemIndex()
  const isCopyContainer = useSelectorTyped(state => state.copy.isCopyContainer)
  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ itemIndex }))
  const isBoqRowSortDisabled = isCopyContainer || isLastBoqRow
  return isBoqRowSortDisabled
}
