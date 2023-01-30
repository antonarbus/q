import { useSelectorTyped } from 'client/store'
import { CopyContainer } from './CopyContainer'

export const Copy = () => {
  const { isShown } = useSelectorTyped(state => state.copy)
  return isShown ? <CopyContainer /> : null
}
