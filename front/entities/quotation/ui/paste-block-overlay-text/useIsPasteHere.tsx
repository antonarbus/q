import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useBlock } from '../../provider/block/useBlock'

export const useIsPasteHere = (): boolean => {
  const block = useBlock()
  const id = reduxHolder.getState().quotation.blocks[block.index]?.id
  const pastePos = reduxHolder.useSelector((state) => state.copy.place.pastePos)
  const pasteItemId = reduxHolder.useSelector((state) => state.copy.place.id)

  const isPasteTextShown = reduxHolder.useSelector((state) => state.copy.isPasteTextShown)

  const isPasteHere = isPasteTextShown && id === pasteItemId && pastePos === 'middle'

  return isPasteHere
}
