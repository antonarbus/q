import { copySlice } from '@entity/copy/copySlice'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { cls } from '@shared/cls'
import { generateId } from '@front/shared/lib/nanoid'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch, getState } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { fixElementDimensionStyle } from '@shared/util/fixElementDimensionStyle'
import { useEffectOnce, useUnmount } from 'react-use'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import type { RowBlock } from '@back/entity/quotation/schema'
import { roundTo } from 'round-to'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'
import { getItemFromStore } from '@entity/quotation/redux/getter/getFromStore'

const pasteItemOnClick = (): void => {
  const isBookmarkListPage = window.location.pathname.includes(
    route.bookmarkList,
  )

  if (isBookmarkListPage === true) {
    return
  }

  const isQuotationListPage = window.location.pathname.includes(
    route.quotationList,
  )

  if (isQuotationListPage === true) {
    return
  }

  if (getState().copy.isPasteTextShown === false) {
    return
  }

  dispatch(copySlice.actions.hidePasteText())

  if (getState().copy.isPastable === false) {
    return
  }

  const state = getState()
  const [topItemInCopyModal] = state.copy.items

  if (topItemInCopyModal === undefined) {
    return
  }

  if (state.copy.place.pastePos === 'middle') {
    const elementToBeReplaced = document.getElementById(state.copy.place.id)

    if (elementToBeReplaced !== null) {
      const paperElement = elementToBeReplaced.querySelector(`.${cls.paper}`)

      if (paperElement instanceof HTMLElement) {
        // width of animated element is changed for unknown reason, can't explain the issue, so let's fix it for animation purpose
        fixElementDimensionStyle({ element: paperElement })
      }
    }
  }

  const newItemId = generateId()

  dispatch(
    quotationSlice.actions.pasteItem({
      item: topItemInCopyModal,
      id: state.copy.place.id,
      newItemId,
      pastePos: state.copy.place.pastePos,
    }),
  )

  const item = getItemFromStore({ id: newItemId })

  if (topItemInCopyModal.type === 'row' && item?.type === 'row') {
    const rows = getRowsFromStore({ blockIndex: item.blockIndex })

    if (rows === undefined) {
      return
    }

    const subTotalPriceValueNew: number = rows.reduce(
      (accumulator: number, boqRow: RowBlock) => {
        const price = boqRow.price.value

        return accumulator + price
      },
      0,
    )

    const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

    updateSubTotalPriceWithValue({
      blockIndex: item.blockIndex,
      subTotalPriceEditor:
        editorRegistry.get(
          getRegistryKey({
            editorName: 'boqBlockSubTotalPrice',
            blockIndex: item.blockIndex,
            rowIndex: null,
          }),
        ) ?? null,
      value: subTotalPriceValueNewRounded,
      incrementally: true,
    })
  }

  dispatch(copySlice.actions.removeItem())
  dispatch(copySlice.actions.forbidAllActions())

  setTimeout(() => {
    dispatch(copySlice.actions.allowAllActions())
  }, 1000 * theme.block.animationDuration)

  const itemsInCopyModal = getState().copy.items

  if (itemsInCopyModal.length === 0) {
    dispatch(copySlice.actions.hideCopyModal())

    setTimeout(
      () => {
        dispatch(copySlice.actions.allowAllActions())
      },
      1000 * theme.block.animationDuration + 500,
    )
  }
}

export const usePasteItemClick = (): void => {
  useEffectOnce(() => {
    document.addEventListener('click', pasteItemOnClick)
  })

  useUnmount((): void => {
    document.removeEventListener('click', pasteItemOnClick)
  })
}
