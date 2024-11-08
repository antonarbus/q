import { useSelector, dispatch, getState } from '@shared/lib/redux'
import isEqual from 'lodash.isequal'
import { useEffect } from 'react'
import { type CopyPlace, copySlice, getPastePlace } from '@entities/copy'
import { boqRowKey, itemType, quotationSlice } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { route } from '@shared/consts/route'

const movePasteTextItem = (e: MouseEvent): void => {
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

    const isPasteBlock = getState().quotation.blocks.some(
      (block) => block.type === itemType.paste,
    )

    if (isPasteBlock) {
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
    const firstBlock = getState().quotation.blocks[0]

    if (!firstBlock) return

    const pastePlace: CopyPlace = { pastePos: 'top', id: firstBlock.id }
    dispatch(copySlice.actions.updatePastePos(pastePlace))
    dispatch(copySlice.actions.showPasteText())

    dispatch(quotationSlice.actions.insertPasteBlockReducer(pastePlace))

    return
  }

  const blockElement = e.target.closest(`.${cls.block}`)

  if (!blockElement) {
    return
  }

  const prevPlace = getState().copy.place

  const pastePlace = getPastePlace({
    hoveredElement: blockElement,
    e,
    distanceToEdge: 20,
  })

  if (isEqual(pastePlace, prevPlace) && isPasteTextShown) {
    return
  }

  // dispatch(quotationSlice.actions.removePasteItemReducer())
  dispatch(copySlice.actions.updatePastePos(pastePlace))
  dispatch(copySlice.actions.showPasteText())
  dispatch(quotationSlice.actions.insertPasteBlockReducer(pastePlace))
}

const movePasteTextBoqRow = (e: MouseEvent): void => {
  if (!(e.target instanceof Element)) {
    return
  }

  const prevPlace = getState().copy.place
  const isPasteTextShown = getState().copy.isPasteTextShown
  const boqRowsElement = e.target.closest(`.${cls.boqRows}`)

  const isBoqPasteRow = getState()
    .quotation.blocks.filter((block) => block.type === itemType.boq)
    .flatMap((block) => block.boq.rows)
    .some((boqRow) => boqRow.type === boqRowKey.paste)

  const removePasteIfNeeded = (): void => {
    if (isPasteTextShown) {
      dispatch(copySlice.actions.hidePasteText())
    }

    if (isBoqPasteRow) {
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
    hoveredElement: boqRowElement,
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
    if (isBlock) {
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

    return (): void => {
      document.body.style.removeProperty('cursor')
      document.removeEventListener('mousemove', movePasteTextItem)
      document.removeEventListener('mousemove', movePasteTextBoqRow)
    }
  }, [isBlock, isBoqRow])
}
