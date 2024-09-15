import { useSelectorTyped } from '@lib_instances/store'
import { selectIsLastBlock } from '../redux/selectors/selectIsLastBlock'

export const useIsLastBlock = (): boolean => {
  const isLastBlock = useSelectorTyped(selectIsLastBlock)
  return isLastBlock
}
