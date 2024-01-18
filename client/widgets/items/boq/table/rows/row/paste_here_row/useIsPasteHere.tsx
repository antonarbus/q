import { useSelectorTyped } from '@libras/store'
import { useRow } from '@entities/items'

export const useIsPasteHere = (): boolean => {
  const { rowId } = useRow()
  const pastePos = useSelectorTyped(state => state.copy.place.pastePos)
  const pasteItemId = useSelectorTyped(state => state.copy.place.itemId)
  const isPasteTextShown = useSelectorTyped(state => state.copy.isPasteTextShown)
  const isPasteHere = isPasteTextShown && rowId === pasteItemId && pastePos === 'middle'
  return isPasteHere
}
