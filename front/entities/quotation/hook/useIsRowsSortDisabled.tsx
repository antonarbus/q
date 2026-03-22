import { useSelector } from '@front/shared/lib/redux'
import { useBlock } from '../provider/BlockProvider'
import { selectIsLastRow } from '../redux/selector/selectIsLastRow'

export const useIsRowsSortDisabled = (): boolean => {
  const isCopyModalVisible = useSelector((state) => state.copy.isVisible)
  const block = useBlock()

  const isLastRow = useSelector(selectIsLastRow({ blockIndex: block.index }))

  const isRowsSortDisabled = isCopyModalVisible || isLastRow

  return isRowsSortDisabled
}
