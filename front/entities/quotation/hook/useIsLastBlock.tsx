import { reduxHolder } from '@front/shared/lib/redux'
import { selectIsLastBlock } from '../redux/selector/selectIsLastBlock'

export const useIsLastBlock = (): boolean => {
  const isLastBlock = reduxHolder.useSelector(selectIsLastBlock)

  return isLastBlock
}
