import { useSelectorTyped } from '@lib_instances/store'
import { selectIsLastBlock } from '../redux/selectors/selectIsLastBlock'

export const useIsBlockSortDisabled = (): boolean => {
  const isCopyContainer = useSelectorTyped(
    (state) => state.copy.isCopyContainer,
  )
  const isLastBlock = useSelectorTyped(selectIsLastBlock)
  const isItemSortDisabled = isCopyContainer || isLastBlock

  return isItemSortDisabled
}
