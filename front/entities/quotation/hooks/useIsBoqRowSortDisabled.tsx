import { useSelectorTyped } from '@lib_instances/store'
import { useBlock } from '../providers/BlockProvider'
import { selectIsLastBoqRow } from '../redux/selectors/selectIsLastBoqRow'
import { useIsCopyModalVisible } from '@entities/copy'

export const useIsBoqRowSortDisabled = (): boolean => {
  const isCopyModalVisible = useIsCopyModalVisible()
  const { blockIndex } = useBlock()
  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ blockIndex }))
  const isBoqRowSortDisabled = isCopyModalVisible || isLastBoqRow

  return isBoqRowSortDisabled
}
