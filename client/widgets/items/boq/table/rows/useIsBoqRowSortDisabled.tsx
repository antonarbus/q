import { selectIsLastBoqRow } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import { useItem } from 'client/widgets/items/ItemProvider'

export const useIsBoqRowSortDisabled = (): boolean => {
  const { itemIndex } = useItem()
  const isCopyContainer = useSelectorTyped(state => state.copy.isCopyContainer)
  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ itemIndex }))
  const isBoqRowSortDisabled = isCopyContainer || isLastBoqRow
  return isBoqRowSortDisabled
}
