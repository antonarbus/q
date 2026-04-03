import { useRow } from '@front/entities/quotation/provider/row/useRow'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const useIsPasteHere = (): boolean => {
  const row = useRow()
  const pastePos = reduxHolder.useSelector((state) => state.copy.place.pastePos)
  const pasteItemId = reduxHolder.useSelector((state) => state.copy.place.id)

  const isPasteTextShown = reduxHolder.useSelector((state) => state.copy.isPasteTextShown)

  const isPasteHere = isPasteTextShown && row.item.id === pasteItemId && pastePos === 'middle'

  return isPasteHere
}
