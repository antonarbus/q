import { useEffectOnce, useUnmount } from 'react-use'
import { dispatch, getState } from 'client/shared/clients'
import isEqual from 'lodash.isequal'
import { copySlice } from 'client/entities/copy'
import { itemsSlice } from 'client/entities/items'
import type { CopyPlace } from 'client/shared/types'
import { className } from 'client/shared/className'
import { useSelectorTyped } from 'client/shared/hooks'
import { useEffect } from 'react'

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

  const elementsUnderCursor = document.elementsFromPoint(e.x, e.y)
  const overActionsContainer = elementsUnderCursor.some(element => element.classList.contains(className.actionsContainer))

  if (overActionsContainer && isPasteTextShown) {
    dispatch(copySlice.actions.hidePasteText())
    dispatch(itemsSlice.actions.removePasteItem())
    return
  }

  if (!overActionsContainer && !isPasteTextShown) {
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
  const typeOfNextPasteItem = useSelectorTyped(state => state.copy.items.at(0)?.type)

  const isItem = typeOfNextPasteItem === 'boq' || typeOfNextPasteItem === 'text'
  const isBoqRow = typeOfNextPasteItem === 'boq row'

  useEffect(() => {
    if (isItem) {
      document.body.style.cursor = 'pointer'
      document.addEventListener('mousemove', movePasteTextAfterCursor, {
        passive: true,
      })
    }

    if (isBoqRow) {
      console.log('here goes event listener for tracking paste text position for boq row')
    }

    return () => {
      console.log('remove paste listeners')
      document.body.style.removeProperty('cursor')
      document.removeEventListener('mousemove', movePasteTextAfterCursor)
    }
  }, [isItem, isBoqRow])

  // useUnmount(() => {
  //   document.body.style.removeProperty('cursor')
  //   document.removeEventListener('mousemove', movePasteTextAfterCursor)
  // })
}
