import { reduxHolder } from '@front/shared/lib/redux'
import { useBlock } from '../provider/BlockProvider'
import { selectIsLastRow } from '../redux/selector/selectIsLastRow'

export const useIsRowsSortDisabled = (): boolean => {
  const isCopyModalVisible = reduxHolder.useSelector((state) => state.copy.isVisible)

  const block = useBlock()

  const isLastRow = reduxHolder.useSelector(selectIsLastRow({ blockIndex: block.index }))

  const isRowsSortDisabled = isCopyModalVisible || isLastRow

  return isRowsSortDisabled
}
