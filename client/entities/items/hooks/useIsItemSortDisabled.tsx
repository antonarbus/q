import { useSelectorTyped } from '@shared/hooks'
import { selectIsLastItem } from '../redux/selectors/selectIsLastItem'

export const useIsItemSortDisabled = (): boolean => {
  const isCopyContainer = useSelectorTyped(state => state.copy.isCopyContainer)
  const isLastItem = useSelectorTyped(selectIsLastItem)
  const isItemSortDisabled = isCopyContainer || isLastItem
  return isItemSortDisabled
}
