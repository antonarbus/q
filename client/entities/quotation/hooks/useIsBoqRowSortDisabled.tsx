import { useSelectorTyped } from '@lib_instances/store'
import { useItem } from '../providers/ItemProvider'
import { selectIsLastBoqRow } from '../redux/selectors/selectIsLastBoqRow'

export const useIsBoqRowSortDisabled = (): boolean => {
  const { itemIndex } = useItem()
  const isCopyContainer = useSelectorTyped(state => state.copy.isCopyContainer)
  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ itemIndex }))
  const isBoqRowSortDisabled = isCopyContainer || isLastBoqRow
  return isBoqRowSortDisabled
}
