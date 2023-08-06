import { selectIsLastItem } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'

export const useIsDisabledItem = (): boolean => {
  const isCopyMode = useSelectorTyped((state) => state.copy.isCopyMode)
  const isLastItem = useSelectorTyped(selectIsLastItem)
  const isDisabled = isCopyMode || isLastItem
  return isDisabled
}
