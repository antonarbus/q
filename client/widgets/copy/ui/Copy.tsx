import { useSelectorTyped } from 'client/shared/hooks'
import { CopyContainer } from './CopyContainer'

export const Copy = (): JSX.Element | null => {
  const isCopyContainer = useSelectorTyped((state) => state.copy.isCopyContainer)

  if (!isCopyContainer) return null

  return <CopyContainer />
}
