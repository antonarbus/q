import { useIsCopyModalVisible } from '@entity/copy/useIsCopyModalVisible'
import { useSelector } from '@shared/lib/redux'
import { useBlock } from '../provider/BlockProvider'
import { selectIsLastRow } from '../redux/selector/selectIsLastRow'

export const useIsRowsSortDisabled = (): boolean => {
  const isCopyModalVisible = useIsCopyModalVisible()
  const block = useBlock()

  const isLastRow = useSelector(selectIsLastRow({ blockIndex: block.index }))

  const isRowsSortDisabled = isCopyModalVisible || isLastRow

  return isRowsSortDisabled
}
