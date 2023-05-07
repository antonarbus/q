import { store, useSelectorTyped } from 'client/store'

type TProps = {
  index: number
}

export const useIsPasteHere = ({ index }: TProps) => {
  const itemId = store.getState().items?.[index]?.id
  const pastePos = useSelectorTyped(state => state.copy.place.pastePos)
  const pasteItemId = useSelectorTyped(state => state.copy.place.itemId)
  const isPasteTextShown = useSelectorTyped(state => state.copy.isPasteTextShown)
  const isPasteHere = isPasteTextShown && itemId === pasteItemId && pastePos === 'middle'
  return isPasteHere
}
