import { useEffectOnce, useUnmount } from 'react-use'
import { dispatch, getState } from 'client/shared/clients'
import isEqual from 'lodash.isequal'
import { copySlice } from 'client/entities/copy'
import { itemsSlice } from 'client/entities/items'
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
  const prevPlace = getState().copy.place
  const isPasteTextShown = getState().copy.isPasteTextShown

  const nav = (e.target as Element).closest('nav')

  if (nav) {
    if (!isPasteTextShown) return
    dispatch(copySlice.actions.hidePasteText())
    return
  }

  const actionsContainer = (e.target as Element).closest(`.${className.actionsContainer}`)

  console.log('🚀  actionsContainer:', actionsContainer)

  if (actionsContainer && isPasteTextShown) {
    dispatch(copySlice.actions.hidePasteText())
    dispatch(itemsSlice.actions.removePasteItem())
    return
  }

  if (!actionsContainer && !isPasteTextShown) {
    dispatch(copySlice.actions.showPasteText())
    return
  }

  const isPastable = getState().copy.isPastable

  if (!isPastable) {
    dispatch(copySlice.actions.hidePasteText())
    dispatch(itemsSlice.actions.removePasteItem())
    return
  }

  const isNarrowGapAboveNav = e.clientY < 10
  if (isNarrowGapAboveNav) return

  const item = (e.target as Element).closest(`.${className.item}`)

  const pastePlace = item ? getPastePlace({ item, e }) : prevPlace

  if (isEqual(pastePlace, prevPlace)) return

  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())
  dispatch(itemsSlice.actions.insertPasteItem(pastePlace))
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
