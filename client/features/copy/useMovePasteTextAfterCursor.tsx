import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { hidePasteText, showPasteText, updatePasteTextPos } from './copySlice'
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
  const prevPlace = store.getState().copy.place
  const isPasteTextShown = store.getState().copy.isPasteTextShown

  const nav = (e.target as Element).closest('nav')

  if (nav) {
    if (!isPasteTextShown) return
    store.dispatch(hidePasteText())
    return
  }

  const actions = (e.target as Element).closest('.actions-container')
  if (actions) {
    if (!isPasteTextShown) return
    store.dispatch(hidePasteText())
    return
  }

  const isNarrowGapAboveNav = e.clientY < 10
  if (isNarrowGapAboveNav) return

  const item = (e.target as Element).closest('.item')

  const pastePlace = item ? getPastePlace({ item, e }) : prevPlace

  store.dispatch(showPasteText())
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
