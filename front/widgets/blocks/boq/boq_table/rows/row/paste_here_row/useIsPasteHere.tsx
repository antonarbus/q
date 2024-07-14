import { useSelectorTyped } from '@lib_instances/store'
import { useRow } from '@entities/quotation'

export const useIsPasteHere = (): boolean => {
  const { rowId } = useRow()
  const pastePos = useSelectorTyped((state) => state.copy.place.pastePos)
  const pasteItemId = useSelectorTyped((state) => state.copy.place.id)
  const isPasteTextShown = useSelectorTyped(
    (state) => state.copy.isPasteTextShown,
  )
  const isPasteHere =
    isPasteTextShown && rowId === pasteItemId && pastePos === 'middle'
  return isPasteHere
}
