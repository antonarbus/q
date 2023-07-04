import { useSelectorTyped } from 'client/store'
import { CopyContainer } from './CopyContainer'

export const Copy = () => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  if (!isCopyMode) return null
  return <CopyContainer />
}
