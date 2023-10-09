import isEqual from 'lodash.isequal'
import { dispatch, getState } from 'client/shared/clients'
import { copySlice } from 'client/entities/copy'
import { className } from 'client/shared/className'
import { itemsSlice } from 'client/entities/items'
import { getPastePlace } from 'client/shared/lib'
import { type BoqItem } from 'client/shared/types'

export const movePasteTextForBoqRow = (e: MouseEvent): void => {
  if (!(e.target instanceof Element)) return

  const prevPlace = getState().copy.place
  const isPasteTextShown = getState().copy.isPasteTextShown
  console.log('🚀  isPasteTextShown:', isPasteTextShown)
  const boqRowsElement = e.target.closest('.boq-rows')
  const isBoqPasteItem = (getState().items
    .filter(item => item.type === 'boq') as BoqItem[])
    .flatMap(item => item.boq.rows)
    .some(boqRow => boqRow.type === 'boq paste')

  if (!boqRowsElement) {
    if (isPasteTextShown) {
      dispatch(copySlice.actions.hidePasteText())
    }
    if (isBoqPasteItem) {
      dispatch(itemsSlice.actions.removePasteItem())
    }
    return
  }

  const elementsUnderCursor = document.elementsFromPoint(e.x, e.y)
  const isCursorOverActionsContainer = elementsUnderCursor.some(element => element.classList.contains(className.actionsContainer))

  if (isCursorOverActionsContainer && isPasteTextShown) {
    if (isPasteTextShown) {
      dispatch(copySlice.actions.hidePasteText())
    }
    if (isBoqPasteItem) {
      dispatch(itemsSlice.actions.removePasteItem())
    }
    return
  }

  // if (!isCursorOverActionsContainer && !isPasteTextShown) {
  //   dispatch(copySlice.actions.showPasteText())
  //   return
  // }

  const isPastable = getState().copy.isPastable

  if (!isPastable) {
    dispatch(copySlice.actions.hidePasteText())
    dispatch(itemsSlice.actions.removePasteItem())
    return
  }

  const boqRowElement = e.target.closest(`.${className.boqRow}`)

  if (!boqRowElement) return

  const pastePlace = getPastePlace({ item: boqRowElement, e, distanceToEdge: 10 })
  console.log('🚀  pastePlace:', pastePlace)

  if (isEqual(pastePlace, prevPlace) && isPasteTextShown) return

  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())
  dispatch(itemsSlice.actions.insertPasteBoqRow(pastePlace))
}
