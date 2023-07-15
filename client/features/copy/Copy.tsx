import { useSelectorTyped } from 'client/store'
import { CopyContainer } from './CopyContainer'

export const Copy = () => {
  const isCopyContainer = useSelectorTyped(state => state.copy.isCopyContainer)

  if (!isCopyContainer) return null

  return <CopyContainer />
}
