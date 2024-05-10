import { dispatch, getState } from '@lib_instances/store'
import isEqual from 'lodash.isequal'
import { type CopyPlace, copySlice, getPastePlace } from '@entities/copy'
import { itemKey, quotationSlice } from '@entities/quotation'
import { className } from '@shared/consts/className'
import { route } from '@shared/consts/route'

export const movePasteTextForItem = (e: MouseEvent): void => {
  if (!(e.target instanceof Element)) {
    return
  }

  if (window.location.pathname.includes(route.quotations)) {
    return
  }

  const navElement = e.target.closest('nav')
  const isPasteTextShown = getState().copy.isPasteTextShown
  const isPasteItem = getState().quotation.items.some(item => item.type === itemKey.paste)

  const removePasteIfNeeded = (): void => {
    if (isPasteTextShown) {
      dispatch(copySlice.actions.hidePasteText())
    }

    if (isPasteItem) {
      dispatch(quotationSlice.actions.removePasteItemReducer())
    }
  }

  if (navElement) {
    removePasteIfNeeded()
    return
  }

  const elementsUnderCursor = document.elementsFromPoint(e.x, e.y)
  const isCursorOverActionsContainer = elementsUnderCursor.some(element => element.classList.contains(className.actionsContainer))

  if (isCursorOverActionsContainer) {
    removePasteIfNeeded()
    return
  }

  const isSearchElement = elementsUnderCursor.some(element => element.classList.contains(className.search))

  if (isSearchElement) {
    removePasteIfNeeded()
    return
  }

  const isSearchAutocompleteElement = elementsUnderCursor.some(element => element.classList.contains(className.searchAutocomplete))

  if (isSearchAutocompleteElement) {
    removePasteIfNeeded()
    return
  }

  const isPastable = getState().copy.isPastable

  if (!isPastable) {
    removePasteIfNeeded()
    return
  }

  const isNarrowGapAboveNav = e.clientY < 10

  if (isNarrowGapAboveNav) {
    return
  }

  const isNarrowGapUnderNav = e.clientY > 65 && e.clientY < 75

  if (isNarrowGapUnderNav && !isPasteTextShown) {
    const firstItem = getState().quotation.items[0]
    if (!firstItem) return
    const pastePlace: CopyPlace = { pastePos: 'top', itemId: firstItem.id }
    dispatch(copySlice.actions.updatePastePos(pastePlace))
    dispatch(copySlice.actions.showPasteText())

    dispatch(quotationSlice.actions.insertPasteItemReducer(pastePlace))
    return
  }

  const item = (e.target).closest(`.${className.item}`)

  if (!item) {
    return
  }

  const prevPlace = getState().copy.place
  const pastePlace = getPastePlace({ item, e, distanceToEdge: 20 })

  if (isEqual(pastePlace, prevPlace) && isPasteTextShown) {
    return
  }

  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())
  dispatch(quotationSlice.actions.insertPasteItemReducer(pastePlace))
}
