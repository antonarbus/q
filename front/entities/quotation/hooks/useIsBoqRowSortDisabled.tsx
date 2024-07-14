import { useSelectorTyped } from '@lib_instances/store'
import { useBlock } from '../providers/BlockProvider'
import { selectIsLastBoqRow } from '../redux/selectors/selectIsLastBoqRow'

export const useIsBoqRowSortDisabled = (): boolean => {
  const { blockIndex } = useBlock()
  const isCopyContainer = useSelectorTyped(
    (state) => state.copy.isCopyContainer,
  )
  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ blockIndex }))
  const isBoqRowSortDisabled = isCopyContainer || isLastBoqRow
  return isBoqRowSortDisabled
}
