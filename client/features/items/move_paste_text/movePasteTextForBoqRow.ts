import { dispatch, getState } from '@lib_instances/store'
import isEqual from 'lodash.isequal'
import { copySlice, getPastePlace } from '@entities/copy'
import { boqRowKey, itemKey, quotationSlice } from '@entities/quotation'
import { type ItemBoq } from '@entities/quotation'
import { cls } from '@shared/consts/cls'

export const movePasteTextForBoqRow = (e: MouseEvent): void => {
  if (!(e.target instanceof Element)) {
    return
  }

  const prevPlace = getState().copy.place
  const isPasteTextShown = getState().copy.isPasteTextShown
  const boqRowsElement = e.target.closest(`.${cls.boqRows}`)

  const isBoqPasteItem = (getState().quotation.items
    .filter(item => item.type === itemKey.boq) as ItemBoq[])
    .flatMap(item => item.boq.rows)
    .some(boqRow => boqRow.type === boqRowKey.paste)

  const removePasteIfNeeded = (): void => {
    if (isPasteTextShown) {
      dispatch(copySlice.actions.hidePasteText())
    }

    if (isBoqPasteItem) {
      dispatch(quotationSlice.actions.removePasteItemReducer())
    }
  }

  if (!boqRowsElement) {
    removePasteIfNeeded()
    return
  }

  const elementsUnderCursor = document.elementsFromPoint(e.x, e.y)
  const isCursorOverActionsContainer = elementsUnderCursor.some(element => element.classList.contains(cls.actionsContainer))

  if (isCursorOverActionsContainer) {
    removePasteIfNeeded()
    return
  }

  const isSearchElement = elementsUnderCursor.some(element => element.classList.contains(cls.search))

  if (isSearchElement) {
    removePasteIfNeeded()
    return
  }

  const isSearchAutocompleteElement = elementsUnderCursor.some(element => element.classList.contains(cls.searchAutocomplete))

  if (isSearchAutocompleteElement) {
    removePasteIfNeeded()
    return
  }

  const isPastable = getState().copy.isPastable

  if (!isPastable) {
    removePasteIfNeeded()
    return
  }

  const boqRowElement = e.target.closest(`.${cls.boqRow}`)

  if (!boqRowElement) {
    return
  }

  const pastePlace = getPastePlace({ item: boqRowElement, e, distanceToEdge: 10 })

  if (isEqual(pastePlace, prevPlace) && isPasteTextShown) {
    return
  }

  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())
  dispatch(quotationSlice.actions.insertPasteBoqRowReducer(pastePlace))
}
