import { selectIsLastItem } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'

export const useIsItemSortDisabled = (): boolean => {
  const isCopyContainer = useSelectorTyped(state => state.copy.isCopyContainer)
  const isLastItem = useSelectorTyped(selectIsLastItem)
  const isItemSortDisabled = isCopyContainer || isLastItem
  return isItemSortDisabled
}
