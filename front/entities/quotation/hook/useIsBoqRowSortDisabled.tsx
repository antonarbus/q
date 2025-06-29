import { useSelector } from '@shared/lib/redux'
import { useBlock } from '../provider/BlockProvider'
import { selectIsLastBoqRow } from '../redux/selector/selectIsLastBoqRow'
import { useIsCopyModalVisible } from '@entities/copy'

export const useIsBoqRowSortDisabled = (): boolean => {
  const isCopyModalVisible = useIsCopyModalVisible()
  const { blockIndex } = useBlock()
  const isLastBoqRow = useSelector(selectIsLastBoqRow({ blockIndex }))
  const isBoqRowSortDisabled = isCopyModalVisible || isLastBoqRow

  return isBoqRowSortDisabled
}
