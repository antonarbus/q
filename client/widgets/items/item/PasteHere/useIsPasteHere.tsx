import { useSelectorTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'

interface IProps {
  index: number
}

export const useIsPasteHere = ({ index }: IProps): boolean => {
  const itemId = store.getState().items[index]?.id
  const pastePos = useSelectorTyped(state => state.copy.place.pastePos)
  const pasteItemId = useSelectorTyped(state => state.copy.place.itemId)
  const isPasteTextShown = useSelectorTyped(state => state.copy.isPasteTextShown)
  const isPasteHere = isPasteTextShown && itemId === pasteItemId && pastePos === 'middle'
  return isPasteHere
}
