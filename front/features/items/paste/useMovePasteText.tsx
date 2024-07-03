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

  const isPasteTextShown = getState().copy.isPasteTextShown

  const removePasteIfNeeded = (): void => {
    if (isPasteTextShown) {
      dispatch(copySlice.actions.hidePasteText())
    }

    const isPasteItem = getState().quotation.items.some(
      (item) => item.type === itemKey.paste,
    )

    if (isPasteItem) {
      dispatch(quotationSlice.actions.removePasteItemReducer())
    }
  }

  const navElement = e.target.closest('nav')

  if (navElement) {
    removePasteIfNeeded()
    return
  }

  const elementsUnderCursor = document.elementsFromPoint(e.x, e.y)

  const isCursorOverActionsContainer = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.actionsContainer),
  )

  if (isCursorOverActionsContainer) {
    removePasteIfNeeded()
    return
  }

  const isSearchElement = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.search),
  )

  if (isSearchElement) {
    removePasteIfNeeded()
    return
  }

  const isSearchAutocompleteElement = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.searchAutocomplete),
  )

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

  const isNarrowGapUnderNav = e.clientY > 100

  if (isNarrowGapUnderNav && !isPasteTextShown) {
    const firstItem = getState().quotation.items[0]
    if (!firstItem) return
    const pastePlace: CopyPlace = { pastePos: 'top', itemId: firstItem.id }
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

  // dispatch(quotationSlice.actions.removePasteItemReducer())
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

  const isBoqPasteItem = getState()
    .quotation.items.filter((item) => item.type === itemKey.boq)
    .flatMap((item) => {
      if (item.type === 'boq') {
        return item.boq.rows
      }
      return []
    })
    .some((boqRow) => boqRow.type === boqRowKey.paste)

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
  const isCursorOverActionsContainer = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.actionsContainer),
  )

  if (isCursorOverActionsContainer) {
    removePasteIfNeeded()
    return
  }

  const isSearchElement = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.search),
  )

  if (isSearchElement) {
    removePasteIfNeeded()
    return
  }

  const isSearchAutocompleteElement = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.searchAutocomplete),
  )

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
