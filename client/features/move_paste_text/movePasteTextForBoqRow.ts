import { dispatch, getState } from '@lib_instances/store'
import isEqual from 'lodash.isequal'
import { copySlice, getPastePlace } from '@entities/copy'
import { itemsSlice } from '@entities/items'
import { className } from '@shared/className'
import { type BoqItem } from '@shared/types'

export const movePasteTextForBoqRow = (e: MouseEvent): void => {
  if (!(e.target instanceof Element)) {
    return
  }

  const prevPlace = getState().copy.place
  const isPasteTextShown = getState().copy.isPasteTextShown
  const boqRowsElement = e.target.closest('.boq-rows')

  const isBoqPasteItem = (getState().items
    .filter(item => item.type === 'boq') as BoqItem[])
    .flatMap(item => item.boq.rows)
    .some(boqRow => boqRow.type === 'boq paste')

  const removePasteIfNeeded = (): void => {
    if (isPasteTextShown) {
      dispatch(copySlice.actions.hidePasteText())
    }

    if (isBoqPasteItem) {
      dispatch(itemsSlice.actions.removePasteItemReducer())
    }
  }

  if (!boqRowsElement) {
    removePasteIfNeeded()
    return
  }

  const elementsUnderCursor = document.elementsFromPoint(e.x, e.y)
  const isCursorOverActionsContainer = elementsUnderCursor.some(element => element.classList.contains(className.actionsContainer))

  if (isCursorOverActionsContainer) {
    removePasteIfNeeded()
    return
  }

  const isPastable = getState().copy.isPastable

  if (!isPastable) {
    removePasteIfNeeded()
    return
  }

  const boqRowElement = e.target.closest(`.${className.boqRow}`)

  if (!boqRowElement) {
    return
  }

  const pastePlace = getPastePlace({ item: boqRowElement, e, distanceToEdge: 10 })

  if (isEqual(pastePlace, prevPlace) && isPasteTextShown) {
    return
  }

  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())
  dispatch(itemsSlice.actions.insertPasteBoqRowReducer(pastePlace))
}
