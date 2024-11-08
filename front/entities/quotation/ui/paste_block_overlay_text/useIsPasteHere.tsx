import { getState, useSelector } from '@shared/lib/redux'
import { useBlock } from '../../providers/BlockProvider'

export const useIsPasteHere = (): boolean => {
  const { blockIndex } = useBlock()
  const id = getState().quotation.blocks[blockIndex]?.id
  const pastePos = useSelector((state) => state.copy.place.pastePos)
  const pasteItemId = useSelector((state) => state.copy.place.id)

  const isPasteTextShown = useSelector((state) => state.copy.isPasteTextShown)

  const isPasteHere =
    isPasteTextShown && id === pasteItemId && pastePos === 'middle'

  return isPasteHere
}
