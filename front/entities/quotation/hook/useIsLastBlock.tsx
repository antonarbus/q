import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { selectIsLastBlock } from '../redux/selector/selectIsLastBlock'

export const useIsLastBlock = (): boolean => {
  const isLastBlock = reduxHolder.useSelector(selectIsLastBlock)

  return isLastBlock
}
