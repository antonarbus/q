import { selectIsLastItem } from 'client/features/items/itemsSlice'
import { useSelectorTyped } from 'client/store'

export const useIsDisabledItem = () => {
  const isPasteMode = useSelectorTyped(state => state.copy.isCopyMode)
  const isLastItem = useSelectorTyped(selectIsLastItem)
  const isDisabled = isPasteMode || isLastItem
  return isDisabled
}
