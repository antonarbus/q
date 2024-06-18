import { getState, useSelectorTyped } from '@lib_instances/store'
import { useItem } from '../../providers/ItemProvider'

export const useIsPasteHere = (): boolean => {
  const { itemIndex } = useItem()
  const itemId = getState().quotation.items[itemIndex]?.id
  const pastePos = useSelectorTyped((state) => state.copy.place.pastePos)
  const pasteItemId = useSelectorTyped((state) => state.copy.place.itemId)
  const isPasteTextShown = useSelectorTyped(
    (state) => state.copy.isPasteTextShown,
  )
  const isPasteHere =
    isPasteTextShown && itemId === pasteItemId && pastePos === 'middle'
  return isPasteHere
}
