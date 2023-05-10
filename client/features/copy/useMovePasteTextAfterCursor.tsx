import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { hidePasteText, showPasteText, updatePasteTextPos } from './copySlice'
import { CopyPlaceType } from './types'
import isEqual from 'lodash.isequal'

type TProps = {
  item: Element,
  e: MouseEvent
}

function getPastePlace({ item, e }: TProps): CopyPlaceType {
  const { height, top } = item.getBoundingClientRect()
  const yWithinElement = e.clientY - top
  const distToTop = yWithinElement
  const distToBottom = height - yWithinElement

  if (distToTop < 20) return { pastePos: 'top', itemId: item.id }
  if (distToBottom < 20) return { pastePos: 'bottom', itemId: item.id }
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

  const actionsButton = (e.target as Element).closest('.actions > *')

  if (actionsButton && isPasteTextShown) {
    store.dispatch(hidePasteText())
    return
  }

  if (!actionsButton && !isPasteTextShown) {
    store.dispatch(showPasteText())
    return
  }

  const isNarrowGapAboveNav = e.clientY < 10
  if (isNarrowGapAboveNav) return

  const item = (e.target as Element).closest('.item')

  const pastePlace = item ? getPastePlace({ item, e }) : prevPlace

  if (isEqual(pastePlace, prevPlace)) return

  store.dispatch(showPasteText())
  store.dispatch(updatePasteTextPos(pastePlace))
}

export const useMovePasteTextAfterCursor = () => {
  useEffectOnce(() => {
    document.body.style.cursor = 'pointer'
    document.addEventListener('mousemove', movePasteTextAfterCursor, { passive: true })
  })

  useUnmount(() => {
    document.body.style.removeProperty('cursor')
    document.removeEventListener('mousemove', movePasteTextAfterCursor)
  })
}
