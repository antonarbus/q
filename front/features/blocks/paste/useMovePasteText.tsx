import { useSelector, dispatch, getState } from '@shared/lib/redux'
import isEqual from 'lodash.isequal'
import { useEffect } from 'react'
import { type CopyPlace, copySlice, getPastePlace } from '@entities/copy'
import { boqRowKey, itemType, quotationSlice } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { route } from '@shared/consts/route'

const movePasteTextItem = (e: MouseEvent): void => {
  if (e.target instanceof Element === false) {
    return
  }

  const isQuotationListPage = window.location.pathname.includes(
    route.quotationList,
  )

  if (isQuotationListPage === true) {
    return
  }

  const { isPasteTextShown } = getState().copy

  const removePasteIfNeeded = (): void => {
    if (isPasteTextShown === true) {
      dispatch(copySlice.actions.hidePasteText())
    }

    const isPasteBlock = getState().quotation.blocks.some(
      (block) => block.type === itemType.paste,
    )

    if (isPasteBlock === true) {
      dispatch(quotationSlice.actions.removePasteItemReducer())
    }
  }

  const navElement = e.target.closest('nav')

  if (navElement !== null) {
    removePasteIfNeeded()

    return
  }

  const elementsUnderCursor = document.elementsFromPoint(e.x, e.y)

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

  const { isPastable } = getState().copy

  if (isPastable === false) {
    removePasteIfNeeded()

    return
  }

  const isNarrowGapAboveNav = e.clientY < 10

  if (isNarrowGapAboveNav === true) {
    return
  }

  const isNarrowGapUnderNav = e.clientY > 100

  const isCursorAboveUnderNavDuringCopy =
    isNarrowGapUnderNav && isPasteTextShown === false

  if (isCursorAboveUnderNavDuringCopy === true) {
    const [firstBlock] = getState().quotation.blocks

    if (firstBlock === undefined) {
      return
    }

    const pastePlace: CopyPlace = { pastePos: 'top', id: firstBlock.id }
    dispatch(copySlice.actions.updatePastePos(pastePlace))
    dispatch(copySlice.actions.showPasteText())

    dispatch(quotationSlice.actions.insertPasteBlockReducer(pastePlace))

    return
  }

  const blockElement = e.target.closest(`.${cls.block}`)

  if (blockElement === null) {
    return
  }

  const prevPlace = getState().copy.place

  const pastePlace = getPastePlace({
    hoveredElement: blockElement,
    e,
    distanceToEdge: 20,
  })

  const stillMayPasteToTheSamePlace =
    isEqual(pastePlace, prevPlace) && isPasteTextShown

  if (stillMayPasteToTheSamePlace === true) {
    return
  }

  // dispatch(quotationSlice.actions.removePasteItemReducer())
  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())

  const movedUpBetweenItems =
    prevPlace.pastePos === 'bottom' && pastePlace.pastePos === 'top'

  if (movedUpBetweenItems === true) {
    return
  }

  const movedDownBetweenItems =
    prevPlace.pastePos === 'top' && pastePlace.pastePos === 'bottom'

  if (movedDownBetweenItems === true) {
    return
  }

  dispatch(quotationSlice.actions.insertPasteBlockReducer(pastePlace))
}

const movePasteTextBoqRow = (e: MouseEvent): void => {
  if (e.target instanceof Element === false) {
    return
  }

  const prevPlace = getState().copy.place
  const { isPasteTextShown } = getState().copy
  const boqRowsElement = e.target.closest(`.${cls.boqRows}`)

  const isBoqPasteRow = getState()
    .quotation.blocks.filter((block) => block.type === itemType.boq)
    .flatMap((block) => block.boq.rows)
    .some((boqRow) => boqRow.type === boqRowKey.paste)

  const removePasteIfNeeded = (): void => {
    if (isPasteTextShown === true) {
      dispatch(copySlice.actions.hidePasteText())
    }

    if (isBoqPasteRow === true) {
      dispatch(quotationSlice.actions.removePasteItemReducer())
    }
  }

  if (boqRowsElement === null) {
    removePasteIfNeeded()

    return
  }

  const elementsUnderCursor = document.elementsFromPoint(e.x, e.y)

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

  const { isPastable } = getState().copy

  if (isPastable === false) {
    removePasteIfNeeded()

    return
  }

  const boqRowElement = e.target.closest(`.${cls.boqRow}`)

  if (boqRowElement === null) {
    return
  }

  const pastePlace = getPastePlace({
    hoveredElement: boqRowElement,
    e,
    distanceToEdge: 10,
  })

  const shouldPasteToSamePlace =
    isEqual(pastePlace, prevPlace) && isPasteTextShown

  if (shouldPasteToSamePlace === true) {
    return
  }

  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())
  dispatch(quotationSlice.actions.insertPasteBoqRowReducer(pastePlace))
}

export const useMovePasteText = (): void => {
  const typeOfNextPasteItem = useSelector(
    (state) => state.copy.items.at(0)?.type,
  )

  const isBlock =
    typeOfNextPasteItem === itemType.boq ||
    typeOfNextPasteItem === itemType.text ||
    typeOfNextPasteItem === itemType.price

  const isBoqRow = typeOfNextPasteItem === boqRowKey.row

  useEffect(() => {
    const controller = new AbortController()

    if (isBlock === true) {
      document.body.style.cursor = 'pointer'

      document.addEventListener('mousemove', movePasteTextItem, {
        passive: true,
        signal: controller.signal,
      })
    }

    if (isBoqRow === true) {
      document.body.style.cursor = 'pointer'

      document.addEventListener('mousemove', movePasteTextBoqRow, {
        passive: true,
        signal: controller.signal,
      })
    }

    return (): void => {
      document.body.style.removeProperty('cursor')
      controller.abort()
    }
  }, [isBlock, isBoqRow])
}
