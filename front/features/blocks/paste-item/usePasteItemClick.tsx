import { copySlice } from '@front/entities/clipboard/copySlice'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { cls } from '@front/shared/cls'
import { generateId } from '@front/shared/lib/nanoid/generateId'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { theme } from '@front/shared/theme'
import { fixElementDimensionStyle } from '@front/shared/util/fixElementDimensionStyle'
import { useEffectOnce, useUnmount } from 'react-use'
import { recalculateSubTotalPrices } from '@front/entities/quotation/util/recalculateSubTotalPrices'
import { recalculateTotalPrices } from '@front/entities/quotation/util/recalculateTotalPrices'

const pasteItemOnClick = (): void => {
  const isBookmarkListPage = globalThis.location.pathname.includes(route.bookmarkList)

  if (isBookmarkListPage === true) {
    return
  }

  const isQuotationListPage = globalThis.location.pathname.includes(route.quotationList)

  if (isQuotationListPage === true) {
    return
  }

  if (reduxHolder.getState().copy.isPasteTextShown === false) {
    return
  }

  reduxHolder.dispatch(copySlice.actions.hidePasteText())

  if (reduxHolder.getState().copy.isPastable === false) {
    return
  }

  const state = reduxHolder.getState()
  const [topItemInCopyModal] = state.copy.items

  if (topItemInCopyModal === undefined) {
    return
  }

  if (state.copy.place.pastePos === 'middle') {
    const elementToBeReplaced = document.querySelector(`#${state.copy.place.id}`)

    if (elementToBeReplaced !== null) {
      const paperElement = elementToBeReplaced.querySelector(`.${cls.paper}`)

      if (paperElement instanceof HTMLElement) {
        // width of animated element is changed for unknown reason, can't explain the issue, so let's fix it for animation purpose
        fixElementDimensionStyle({ element: paperElement })
      }
    }
  }

  const newItemId = generateId()

  reduxHolder.dispatch(
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

  reduxHolder.dispatch(copySlice.actions.removeItem())
  reduxHolder.dispatch(copySlice.actions.forbidAllActions())

  setTimeout(() => {
    reduxHolder.dispatch(copySlice.actions.allowAllActions())
  }, 1000 * theme.block.animationDuration)

  const itemsInCopyModal = reduxHolder.getState().copy.items

  if (itemsInCopyModal.length === 0) {
    reduxHolder.dispatch(copySlice.actions.hideCopyModal())

    setTimeout(
      () => {
        reduxHolder.dispatch(copySlice.actions.allowAllActions())
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
