import { useSelectorTyped, dispatch, getState } from '@lib_instances/store'
import isEqual from 'lodash.isequal'
import { useEffect } from 'react'
import { type CopyPlace, copySlice, getPastePlace } from '@entities/copy'
import { boqRowKey, itemKey, quotationSlice } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { route } from '@shared/consts/route'

export const useMovePasteText = (): void => {
  const typeOfNextPasteItem = useSelectorTyped(
    (state) => state.copy.items.at(0)?.type,
  )

  const isItem =
    typeOfNextPasteItem === itemKey.boq ||
    typeOfNextPasteItem === itemKey.text ||
    typeOfNextPasteItem === itemKey.price
  const isBoqRow = typeOfNextPasteItem === boqRowKey.row

  useEffect(() => {
    if (isItem) {
      document.body.style.cursor = 'pointer'
      document.addEventListener('mousemove', movePasteTextItem, {
        passive: true,
      })
    }

    if (isBoqRow) {
      document.body.style.cursor = 'pointer'
      document.addEventListener('mousemove', movePasteTextBoqRow, {
        passive: true,
      })
    }

    return () => {
      document.body.style.removeProperty('cursor')
      document.removeEventListener('mousemove', movePasteTextItem)
      document.removeEventListener('mousemove', movePasteTextBoqRow)
    }
  }, [isItem, isBoqRow])
}

function movePasteTextItem(e: MouseEvent): void {
  if (!(e.target instanceof Element)) {
    return
  }

  if (window.location.pathname.includes(route.quotations)) {
    return
  }

  const isCursorOverItemsElement = Boolean(e.target.closest(`.${cls.items}`))

  if (!isCursorOverItemsElement) {
    removePasteText()
    return
  }

  const isCursorOverActionsContainer = Boolean(
    e.target.closest(`.${cls.actionsContainer}`),
  )

  if (isCursorOverActionsContainer) {
    removePasteText()
    return
  }

  const isSearchElementUnderCursor = Boolean(e.target.closest(`.${cls.search}`))

  if (isSearchElementUnderCursor) {
    removePasteText()
    return
  }

  const isSearchAutocompleteElementUnderCursor = Boolean(
    e.target.closest(`.${cls.searchAutocomplete}`),
  )

  if (isSearchAutocompleteElementUnderCursor) {
    removePasteText()
    return
  }

  const isPastable = getState().copy.isPastable

  if (!isPastable) {
    removePasteText()
    return
  }

  const isPasteTextShown = getState().copy.isPasteTextShown

  if (!isPasteTextShown) {
    const firstItem = getState().quotation.items[0]

    if (!firstItem) {
      return
    }

    const pastePlace: CopyPlace = { pastePos: 'top', itemId: firstItem.id }
    removePasteText()
    dispatch(copySlice.actions.updatePastePos(pastePlace))
    dispatch(copySlice.actions.showPasteText())
    dispatch(quotationSlice.actions.insertPasteItemReducer(pastePlace))
    return
  }

  const item = e.target.closest(`.${cls.item}`)

  if (!item) {
    return
  }

  const prevPlace = getState().copy.place
  const pastePlace = getPastePlace({ item, e, distanceToEdge: 20 })

  if (isEqual(pastePlace, prevPlace) && isPasteTextShown) {
    return
  }

  removePasteText()
  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())
  dispatch(quotationSlice.actions.insertPasteItemReducer(pastePlace))
}

function movePasteTextBoqRow(e: MouseEvent): void {
  if (!(e.target instanceof Element)) {
    return
  }

  const prevPlace = getState().copy.place
  const isPasteTextShown = getState().copy.isPasteTextShown
  const boqRowsElement = e.target.closest(`.${cls.boqRows}`)

  if (!boqRowsElement) {
    removePasteText()
    return
  }

  const elementsUnderCursor = document.elementsFromPoint(e.x, e.y)
  const isCursorOverActionsContainer = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.actionsContainer),
  )

  if (isCursorOverActionsContainer) {
    removePasteText()
    return
  }

  const isSearchElement = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.search),
  )

  if (isSearchElement) {
    removePasteText()
    return
  }

  const isSearchAutocompleteElement = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.searchAutocomplete),
  )

  if (isSearchAutocompleteElement) {
    removePasteText()
    return
  }

  const isPastable = getState().copy.isPastable

  if (!isPastable) {
    removePasteText()
    return
  }

  const boqRowElement = e.target.closest(`.${cls.boqRow}`)

  if (!boqRowElement) {
    return
  }

  const pastePlace = getPastePlace({
    item: boqRowElement,
    e,
    distanceToEdge: 10,
  })

  if (isEqual(pastePlace, prevPlace) && isPasteTextShown) {
    return
  }

  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())
  dispatch(quotationSlice.actions.insertPasteBoqRowReducer(pastePlace))
}

function removePasteText(): void {
  dispatch(quotationSlice.actions.removePasteItemReducer())
  dispatch(copySlice.actions.hidePasteText())
}
