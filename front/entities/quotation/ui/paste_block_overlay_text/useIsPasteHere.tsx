import { getState, useSelectorTyped } from '@lib_instances/store'
import { useBlock } from '../../providers/BlockProvider'

export const useIsPasteHere = (): boolean => {
  const { blockIndex } = useBlock()
  const id = getState().quotation.blocks[blockIndex]?.id
  const pastePos = useSelectorTyped((state) => state.copy.place.pastePos)
  const pasteItemId = useSelectorTyped((state) => state.copy.place.id)

  const isPasteTextShown = useSelectorTyped(
    (state) => state.copy.isPasteTextShown,
  )

  const isPasteHere =
    isPasteTextShown && id === pasteItemId && pastePos === 'middle'

  return isPasteHere
}
