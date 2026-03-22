import { getState, useSelector } from '@front/shared/lib/redux'
import { useBlock } from '../../provider/BlockProvider'

export const useIsPasteHere = (): boolean => {
  const block = useBlock()
  const id = getState().quotation.blocks[block.index]?.id
  const pastePos = useSelector((state) => state.copy.place.pastePos)
  const pasteItemId = useSelector((state) => state.copy.place.id)
  const isPasteTextShown = useSelector((state) => state.copy.isPasteTextShown)

  const isPasteHere =
    isPasteTextShown && id === pasteItemId && pastePos === 'middle'

  return isPasteHere
}
