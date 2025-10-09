import { useRow } from '@entities/quotation'
import { useSelector } from '@shared/lib/redux'

export const useIsPasteHere = (): boolean => {
  const { row } = useRow()
  const pastePos = useSelector((state) => state.copy.place.pastePos)
  const pasteItemId = useSelector((state) => state.copy.place.id)

  const isPasteTextShown = useSelector((state) => state.copy.isPasteTextShown)

  const isPasteHere =
    isPasteTextShown && row.id === pasteItemId && pastePos === 'middle'

  return isPasteHere
}
