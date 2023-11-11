import { useSelectorTyped } from 'client/shared/hooks'
import { getState } from 'client/shared/clients'

type Props = {
  itemIndex: number
}

export const useIsPasteHere = ({ itemIndex }: Props): boolean => {
  const itemId = getState().items[itemIndex]?.id
  const pastePos = useSelectorTyped(state => state.copy.place.pastePos)
  const pasteItemId = useSelectorTyped(state => state.copy.place.itemId)
  const isPasteTextShown = useSelectorTyped(state => state.copy.isPasteTextShown)
  const isPasteHere = isPasteTextShown && itemId === pasteItemId && pastePos === 'middle'
  return isPasteHere
}
