import { useSelector } from '@front/shared/lib/redux'
import { selectIsLastBlock } from '../redux/selector/selectIsLastBlock'

export const useIsLastBlock = (): boolean => {
  const isLastBlock = useSelector(selectIsLastBlock)

  return isLastBlock
}
