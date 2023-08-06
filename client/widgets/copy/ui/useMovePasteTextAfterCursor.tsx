import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/app/store'
import isEqual from 'lodash.isequal'
import type { CopyPlaceType } from 'client/entities/copy'
import {
  hidePasteText,
  showPasteText,
  updatePastePos,
} from 'client/entities/copy'
import { insertPasteItem } from 'client/entities/items'

interface IProps {
  item: Element
  e: MouseEvent
}

const getPastePlace = ({ item, e }: IProps): CopyPlaceType => {
  const { height, top } = item.getBoundingClientRect()
  const yWithinElement = e.clientY - top
  const distToTop = yWithinElement
  const distToBottom = height - yWithinElement

  if (distToTop < 20) return { pastePos: 'top', itemId: item.id }
  if (distToBottom < 20) return { pastePos: 'bottom', itemId: item.id }
  return { pastePos: 'middle', itemId: item.id }
};

const movePasteTextAfterCursor = (e: MouseEvent): void => {
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
  store.dispatch(updatePastePos(pastePlace))
  store.dispatch(insertPasteItem(pastePlace))
};

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
