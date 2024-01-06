import { useSelectorTyped } from 'client/shared/hooks'
import { getState } from 'client/shared/clients'
import { useItem } from '../../providers/ItemProvider'

export const useIsPasteHere = (): boolean => {
  const { itemIndex } = useItem()
  const itemId = getState().items[itemIndex]?.id
  const pastePos = useSelectorTyped(state => state.copy.place.pastePos)
  const pasteItemId = useSelectorTyped(state => state.copy.place.itemId)
  const isPasteTextShown = useSelectorTyped(state => state.copy.isPasteTextShown)
  const isPasteHere = isPasteTextShown && itemId === pasteItemId && pastePos === 'middle'
  return isPasteHere
}
