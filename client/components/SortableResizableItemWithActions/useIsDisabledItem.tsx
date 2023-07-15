import { selectIsLastItem } from 'client/features/items/itemsSlice'
import { useSelectorTyped } from 'client/store'

export const useIsDisabledItem = () => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  const isLastItem = useSelectorTyped(selectIsLastItem)
  const isDisabled = isCopyMode || isLastItem
  return isDisabled
}
