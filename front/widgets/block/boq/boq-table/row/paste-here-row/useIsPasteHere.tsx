import { useRow } from '@entities/quotation/provider/RowProvider'
import { useSelector } from '@shared/lib/redux'

export const useIsPasteHere = (): boolean => {
  const row = useRow()
  const pastePos = useSelector((state) => state.copy.place.pastePos)
  const pasteItemId = useSelector((state) => state.copy.place.id)

  const isPasteTextShown = useSelector((state) => state.copy.isPasteTextShown)

  const isPasteHere =
    isPasteTextShown && row.item.id === pasteItemId && pastePos === 'middle'

  return isPasteHere
}
