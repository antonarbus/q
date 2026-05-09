import type { CopyPlace } from '@front/entities/quotation/redux/clipboardSlice'
import { clipboardSlice } from '@front/entities/quotation/redux/clipboardSlice'
import { getPastePlace } from './getPastePlace'
import { cls } from '@front/shared/cls'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import isEqual from 'lodash.isequal'
import { useEffect } from 'react'

const movePasteTextItem = (event: MouseEvent): void => {
  if (event.target instanceof Element === false) {
    return
  }

  const isQuotationListPage = globalThis.location.pathname.includes(route.quotationList)

  if (isQuotationListPage === true) {
    return
  }

  const removePasteIfNeeded = (): void => {
    if (reduxHolder.getState().clipboard.isPasteTextShown === true) {
      reduxHolder.dispatch(clipboardSlice.actions.hidePasteText())
    }
  }

  const navElement = event.target.closest('nav')

  if (navElement !== null) {
    removePasteIfNeeded()

    return
  }

  const elementsUnderCursor = document.elementsFromPoint(event.x, event.y)

  const isCursorOverActionsContainer = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.actionsContainer),
  )

  if (isCursorOverActionsContainer === true) {
    removePasteIfNeeded()

    return
  }

  const isSearchElement = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.search),
  )

  if (isSearchElement === true) {
    removePasteIfNeeded()

    return
  }

  const isSearchAutocompleteElement = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.searchAutocomplete),
  )

  if (isSearchAutocompleteElement === true) {
    removePasteIfNeeded()

    return
  }

  if (reduxHolder.getState().clipboard.isPastable === false) {
    removePasteIfNeeded()

    return
  }

  const isNarrowGapAboveNav = event.clientY < 10

  if (isNarrowGapAboveNav === true) {
    return
  }

  const isNarrowGapUnderNav = event.clientY > 100

  const isCursorAboveUnderNavDuringCopy =
    isNarrowGapUnderNav && reduxHolder.getState().clipboard.isPasteTextShown === false

  if (isCursorAboveUnderNavDuringCopy === true) {
    const [firstBlock] = reduxHolder.getState().quotation.blocks

    if (firstBlock === undefined) {
      return
    }

    const pastePlace: CopyPlace = { pastePos: 'top', id: firstBlock.id }
    reduxHolder.dispatch(clipboardSlice.actions.updatePastePos(pastePlace))
    reduxHolder.dispatch(clipboardSlice.actions.showPasteText())

    return
  }

  const blockElement = event.target.closest(`.${cls.block}`)

  if (blockElement === null) {
    return
  }

  const prevPlace = reduxHolder.getState().clipboard.place

  const pastePlace = getPastePlace({
    hoveredElement: blockElement,
    event,
    distanceToEdge: 20,
  })

  const stillMayPasteToTheSamePlace =
    isEqual(pastePlace, prevPlace) && reduxHolder.getState().clipboard.isPasteTextShown

  if (stillMayPasteToTheSamePlace === true) {
    return
  }

  reduxHolder.dispatch(clipboardSlice.actions.updatePastePos(pastePlace))
  reduxHolder.dispatch(clipboardSlice.actions.showPasteText())
}

const movePasteTextRow = (event: MouseEvent): void => {
  if (event.target instanceof Element === false) {
    return
  }

  const prevPlace = reduxHolder.getState().clipboard.place
  const rowsElement = event.target.closest(`.${cls.rows}`)

  const removePasteIfNeeded = (): void => {
    if (reduxHolder.getState().clipboard.isPasteTextShown === true) {
      reduxHolder.dispatch(clipboardSlice.actions.hidePasteText())
    }
  }

  if (rowsElement === null) {
    removePasteIfNeeded()

    return
  }

  const elementsUnderCursor = document.elementsFromPoint(event.x, event.y)

  const isCursorOverRows = elementsUnderCursor.some((element) =>
    element.classList.contains(cls.rows),
  )

  if (isCursorOverRows === false) {
    removePasteIfNeeded()

    return
  }

  if (reduxHolder.getState().clipboard.isPastable === false) {
    removePasteIfNeeded()

    return
  }

  const rowElement = event.target.closest(`.${cls.row}`)

  if (rowElement === null) {
    return
  }

  const pastePlace = getPastePlace({
    hoveredElement: rowElement,
    event,
    distanceToEdge: 10,
  })

  const shouldPasteToSamePlace =
    isEqual(pastePlace, prevPlace) && reduxHolder.getState().clipboard.isPasteTextShown

  if (shouldPasteToSamePlace === true) {
    return
  }

  reduxHolder.dispatch(clipboardSlice.actions.updatePastePos(pastePlace))
  reduxHolder.dispatch(clipboardSlice.actions.showPasteText())
}

export const useMovePasteText = (): void => {
  const typeOfNextPasteItem = reduxHolder.useSelector((state) => state.clipboard.items.at(0)?.type)

  const isBlock =
    typeOfNextPasteItem === 'boq' ||
    typeOfNextPasteItem === 'text' ||
    typeOfNextPasteItem === 'price' ||
    typeOfNextPasteItem === 'payment'

  const isRow = typeOfNextPasteItem === 'row'

  useEffect(() => {
    const controller = new AbortController()

    if (isBlock === true) {
      document.body.style.cursor = 'pointer'

      document.addEventListener('mousemove', movePasteTextItem, {
        passive: true,
        signal: controller.signal,
      })
    }

    if (isRow === true) {
      document.body.style.cursor = 'pointer'

      document.addEventListener('mousemove', movePasteTextRow, {
        passive: true,
        signal: controller.signal,
      })
    }

    return (): void => {
      document.body.style.removeProperty('cursor')
      controller.abort()
    }
  }, [isBlock, isRow])
}
