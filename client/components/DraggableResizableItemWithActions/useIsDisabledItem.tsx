import { selectIsLastItem } from 'client/features/items/itemsSlice'
import { useSelectorTyped } from 'client/store'

export const useIsDisabledItem = () => {
  const isPasteMode = useSelectorTyped(state => state.copy.isShown)
  const isLastItem = useSelectorTyped(selectIsLastItem)
  const isDisabled = isPasteMode || isLastItem
  return isDisabled
}
