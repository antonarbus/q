import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/app/store'
import isEqual from 'lodash.isequal'
import { hidePasteText, showPasteText, updatePastePos } from 'client/entities/copy'
import { insertPasteItem, removePasteItem } from 'client/entities/items'
import type { CopyPlace } from 'client/shared/types'
import { className } from 'client/shared/className'

interface Props {
  item: Element
  e: MouseEvent
}

const getPastePlace = ({ item, e }: Props): CopyPlace => {
  const { height, top } = item.getBoundingClientRect()
  const yWithinElement = e.clientY - top
  const distToTop = yWithinElement
  const distToBottom = height - yWithinElement

  if (distToTop < 20) return { pastePos: 'top', itemId: item.id }
  if (distToBottom < 20) return { pastePos: 'bottom', itemId: item.id }
  return { pastePos: 'middle', itemId: item.id }
}

const movePasteTextAfterCursor = (e: MouseEvent): void => {
  const prevPlace = store.getState().copy.place
  const isPasteTextShown = store.getState().copy.isPasteTextShown

  const nav = (e.target as Element).closest('nav')

  if (nav) {
    if (!isPasteTextShown) return
    store.dispatch(hidePasteText())
    return
  }

  const actionsContainer = (e.target as Element).closest(`.${className.actions}`)

  if (actionsContainer && isPasteTextShown) {
    store.dispatch(hidePasteText())
    store.dispatch(removePasteItem())
    return
  }

  if (!actionsContainer && !isPasteTextShown) {
    store.dispatch(showPasteText())
    return
  }

  const isPastable = store.getState().copy.isPastable

  if (!isPastable) {
    store.dispatch(hidePasteText())
    store.dispatch(removePasteItem())
    return
  }

  const isNarrowGapAboveNav = e.clientY < 10
  if (isNarrowGapAboveNav) return

  const item = (e.target as Element).closest(`.${className.item}`)

  const pastePlace = item ? getPastePlace({ item, e }) : prevPlace

  if (isEqual(pastePlace, prevPlace)) return

  store.dispatch(updatePastePos(pastePlace))
  store.dispatch(showPasteText())
  store.dispatch(insertPasteItem(pastePlace))
}

export const useMovePasteTextAfterCursor = (): void => {
  useEffectOnce(() => {
    document.body.style.cursor = 'pointer'
    document.addEventListener('mousemove', movePasteTextAfterCursor, {
      passive: true,
    })
  })

  useUnmount(() => {
    document.body.style.removeProperty('cursor')
    document.removeEventListener('mousemove', movePasteTextAfterCursor)
  })
}
