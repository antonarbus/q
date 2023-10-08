import { dispatch, getState } from 'client/shared/clients'
import isEqual from 'lodash.isequal'
import { copySlice } from 'client/entities/copy'
import { className } from 'client/shared/className'
import { itemsSlice } from 'client/entities/items'
import { getPastePlace } from 'client/shared/lib'

export const movePasteTextForBoqRow = (e: MouseEvent): void => {
  if (!(e.target instanceof Element)) return

  const prevPlace = getState().copy.place
  // const isPasteTextShown = getState().copy.isPasteTextShown

  // const nav = (e.target as Element).closest('nav')

  // if (nav) {
  //   if (!isPasteTextShown) return
  //   dispatch(copySlice.actions.hidePasteText())
  //   return
  // }

  // const elementsUnderCursor = document.elementsFromPoint(e.x, e.y)
  // const isOverActionsContainer = elementsUnderCursor.some(element => element.classList.contains(className.actionsContainer))

  // if (isOverActionsContainer && isPasteTextShown) {
  //   dispatch(copySlice.actions.hidePasteText())
  //   dispatch(itemsSlice.actions.removePasteItem())
  //   return
  // }

  // if (!isOverActionsContainer && !isPasteTextShown) {
  //   dispatch(copySlice.actions.showPasteText())
  //   return
  // }

  // const isPastable = getState().copy.isPastable

  // if (!isPastable) {
  //   dispatch(copySlice.actions.hidePasteText())
  //   dispatch(itemsSlice.actions.removePasteItem())
  //   return
  // }

  // const isNarrowGapAboveNav = e.clientY < 10
  // if (isNarrowGapAboveNav) return

  const boqRowElement = e.target.closest(`.${className.boqRow}`)
  if (!boqRowElement) return
  const pastePlace = getPastePlace({ item: boqRowElement, e, distanceToEdge: 10 })

  // const pastePlace = boqRowElement ? getPastePlace({ item: boqRowElement, e, distanceToEdge: 10 }) : prevPlace

  if (isEqual(pastePlace, prevPlace)) return

  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())
  // dispatch(itemsSlice.actions.insertPasteItem(pastePlace))
  dispatch(itemsSlice.actions.insertPasteBoqRow(pastePlace))
}
