import { useSelectorTyped } from 'client/shared/hooks'

type Props = {
  id: string
}

export const useIsPasteHere = ({ id }: Props): boolean => {
  const pastePos = useSelectorTyped(state => state.copy.place.pastePos)
  const pasteItemId = useSelectorTyped(state => state.copy.place.itemId)
  const isPasteTextShown = useSelectorTyped(state => state.copy.isPasteTextShown)
  const isPasteHere = isPasteTextShown && id === pasteItemId && pastePos === 'middle'
  return isPasteHere
}
