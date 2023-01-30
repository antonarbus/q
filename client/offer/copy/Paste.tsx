import { useSelectorTyped } from 'client/store'
import { PasteContainer } from './PasteContainer'

export const Paste = () => {
  // const isPasteContainerShown = useSelectorTyped(state => state.paste.isShown)
  const isPasteContainerShown = true
  return isPasteContainerShown ? <PasteContainer /> : null
}
