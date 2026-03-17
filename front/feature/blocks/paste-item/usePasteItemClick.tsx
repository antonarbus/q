import { copySlice } from '@entity/copy/copySlice'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { cls } from '@shared/cls'
import { generateId } from '@front/shared/lib/nanoid'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch, getState } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { fixElementDimensionStyle } from '@shared/util/fixElementDimensionStyle'
import { useEffectOnce, useUnmount } from 'react-use'
import { recalculateSubTotalPrices } from '@entity/quotation/util/recalculateSubTotalPrices'
import { recalculateTotalPrices } from '@entity/quotation/util/recalculateTotalPrices'

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

  recalculateSubTotalPrices({ incrementally: true })

  // Deferred so React re-renders first. The editor registry is keyed by blockIndex —
  // inserting a block shifts the price block's index, and its editor stays registered
  // under the old key until PriceValue re-renders with the new blockIndex from context.
  setTimeout(() => {
    recalculateTotalPrices()
  }, 0)

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
