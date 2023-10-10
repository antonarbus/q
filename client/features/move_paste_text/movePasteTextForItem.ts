import { dispatch, getState } from 'client/shared/clients'
import isEqual from 'lodash.isequal'
import { copySlice } from 'client/entities/copy'
import { itemsSlice } from 'client/entities/items'
import { className } from 'client/shared/className'
import { getPastePlace } from 'client/shared/lib'

export const movePasteTextForItem = (e: MouseEvent): void => {
  if (!(e.target instanceof Element)) {
    return
  }

  const navElement = e.target.closest('nav')
  const isPasteTextShown = getState().copy.isPasteTextShown
  const isPasteItem = getState().items.some(item => item.type === 'paste')

  if (navElement) {
    if (isPasteItem) {
      console.log('🚀  isPasteItem:', isPasteItem)
      dispatch(itemsSlice.actions.removePasteItem())
    }

    if (isPasteTextShown) {
      dispatch(copySlice.actions.hidePasteText())
    }

    return
  }

  const elementsUnderCursor = document.elementsFromPoint(e.x, e.y)
  const isCursorOverActionsContainer = elementsUnderCursor.some(element => element.classList.contains(className.actionsContainer))

  if (isCursorOverActionsContainer) {
    if (isPasteItem) {
      dispatch(itemsSlice.actions.removePasteItem())
    }

    if (isPasteTextShown) {
      dispatch(copySlice.actions.hidePasteText())
    }

    return
  }

  if (!isPasteTextShown) {
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
  if (isNarrowGapAboveNav) {
    return
  }

  const item = (e.target).closest(`.${className.item}`)
  if (!item) {
    return
  }

  const prevPlace = getState().copy.place
  const pastePlace = getPastePlace({ item, e, distanceToEdge: 20 })

  if (isEqual(pastePlace, prevPlace)) {
    return
  }

  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())
  dispatch(itemsSlice.actions.insertPasteItem(pastePlace))
}
