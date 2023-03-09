import hash from 'object-hash'
import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { removePasteText, updatePasteTextPos } from './copySlice'
import { CopyPlaceType } from './types'

function movePasteTextAfterCursor(e: MouseEvent) {
  const itemsContainer = (e.target as Element).closest('#items')
  if (!itemsContainer) {
    store.dispatch(removePasteText())
    return
  }

  const actionsContainer = (e.target as Element).closest('.actions-container')
  if (actionsContainer) {
    store.dispatch(removePasteText())
    return
  }

  const item = (e.target as Element).closest('.item')
  if (!item) return

  const { height, top } = item.getBoundingClientRect()
  const yWithinElement = e.clientY - top
  const distToTop = yWithinElement

  let pastePlace: CopyPlaceType
  if (distToTop / height < 0.2) {
    pastePlace = { pastePos: 'top', itemId: item.id }
  } else if (distToTop / height > 0.8) {
    pastePlace = { pastePos: 'bottom', itemId: item.id }
  } else {
    pastePlace = { pastePos: 'middle', itemId: item.id }
  }

  const prevPastePlace = store.getState().copy.place.pastePos
  if (hash(prevPastePlace) === hash(pastePlace)) return

  store.dispatch(updatePasteTextPos(pastePlace))
}

export const usePasteTextPos = () => {
  useEffectOnce(() => {
    document.addEventListener('mousemove', movePasteTextAfterCursor, { passive: true })
  })

  useUnmount(() => {
    document.removeEventListener('mousemove', movePasteTextAfterCursor)
  })
}
