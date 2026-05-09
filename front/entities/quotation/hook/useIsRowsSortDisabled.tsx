import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useBlock } from '../provider/block/useBlock'
import { selectIsLastRow } from '../redux/selector/selectIsLastRow'

export const useIsRowsSortDisabled = (): boolean => {
  const isCopyModalVisible = reduxHolder.useSelector((state) => state.clipboard.isVisible)

  const block = useBlock()

  const isLastRow = reduxHolder.useSelector(selectIsLastRow({ blockIndex: block.index }))

  const isRowsSortDisabled = isCopyModalVisible || isLastRow

  return isRowsSortDisabled
}
