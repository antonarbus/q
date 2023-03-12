import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { removePasteText, updatePasteTextPos } from './copySlice'
import { CopyPlaceType } from './types'

type Props = {
  item: Element,
  e: MouseEvent
}

export const getPastePlace = ({ item, e }: Props) : CopyPlaceType => {
  const { height, top } = item.getBoundingClientRect()
  const yWithinElement = e.clientY - top
  const distToTop = yWithinElement

  if (distToTop / height < 0.2) return { pastePos: 'top', itemId: item.id }
  if (distToTop / height > 0.8) return { pastePos: 'bottom', itemId: item.id }
  return { pastePos: 'middle', itemId: item.id }
}

function movePasteTextAfterCursor(e: MouseEvent) {
  const itemsContainer = (e.target as Element).closest('#items')
  const prevPastePos = store.getState().copy.place.pastePos

  if (!itemsContainer) {
    if (prevPastePos === 'nowhere') return
    store.dispatch(removePasteText())
    return
  }

  const actionsContainer = (e.target as Element).closest('.actions-container')
  if (actionsContainer) {
    if (prevPastePos === 'nowhere') return
    store.dispatch(removePasteText())
    return
  }

  const item = (e.target as Element).closest('.item')
  if (!item) return

  const pastePlace = getPastePlace({ item, e })
  if (prevPastePos === pastePlace.pastePos) return
  store.dispatch(updatePasteTextPos(pastePlace))
}

export const useMovePasteTextAfterCursor = () => {
  useEffectOnce(() => {
    document.body.style.cursor = 'pointer'
    document.addEventListener('mousemove', movePasteTextAfterCursor, { passive: true })
  })

  useUnmount(() => {
    document.body.style.cursor = 'default'
    document.removeEventListener('mousemove', movePasteTextAfterCursor)
  })
}
