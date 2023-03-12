import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { removePasteText, updatePasteTextPos } from './copySlice'
import { CopyPlaceType } from './types'

type Props = {
  item: Element,
  e: MouseEvent
}

function getPastePlace({ item, e }: Props): CopyPlaceType {
  const { height, top } = item.getBoundingClientRect()
  const yWithinElement = e.clientY - top
  const distToTop = yWithinElement

  if (distToTop / height < 0.2) return { pastePos: 'top', itemId: item.id }
  if (distToTop / height > 0.8) return { pastePos: 'bottom', itemId: item.id }
  return { pastePos: 'middle', itemId: item.id }
}

function movePasteTextAfterCursor(e: MouseEvent) {
  const prevPastePos = store.getState().copy.place.pastePos

  const nav = (e.target as Element).closest('nav')

  if (nav) {
    if (prevPastePos === 'nowhere') return
    store.dispatch(removePasteText())
    return
  }

  const actions = (e.target as Element).closest('.actions-container')
  if (actions) {
    if (prevPastePos === 'nowhere') return
    store.dispatch(removePasteText())
    return
  }

  const item = (e.target as Element).closest('.item')
  // if (!item) return

  const pastePlace = item ? getPastePlace({ item, e }) : store.getState().copy.place
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
