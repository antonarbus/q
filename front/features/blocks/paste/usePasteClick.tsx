import { copySlice } from '@entities/copy'
import { quotationSlice } from '@entities/quotation'
import { cls } from '@shared/cls'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@shared/lib/nanoid'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch, getState } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { fixElementDimensionStyle } from '@shared/util/fixElementDimensionStyle'
import { useEffectOnce, useUnmount } from 'react-use'

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

  const { isPasteTextShown } = getState().copy

  if (isPasteTextShown === false) {
    return
  }

  dispatch(copySlice.actions.hidePasteText())

  const { isPastable } = getState().copy

  if (isPastable === false) {
    return
  }

  const { id, pastePos } = getState().copy.place
  const [topItemInCopyModal] = getState().copy.items

  if (topItemInCopyModal === undefined) {
    return
  }

  if (pastePos === 'middle') {
    const elementToBeReplaced = document.getElementById(id)

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
    quotationSlice.actions.pasteItemReducer({
      item: topItemInCopyModal,
      id,
      newItemId,
      pastePos,
    }),
  )

  dispatch(copySlice.actions.removeItem())
  dispatch(copySlice.actions.forbidAllActions())

  setTimeout(() => {
    dispatch(copySlice.actions.allowAllActions())
  }, 1000 * theme.block.animationDuration)

  const itemsInCopyModal = getState().copy.items

  if (itemsInCopyModal.length === 0) {
    dispatch(copySlice.actions.hideCopyModal())
    dispatch(quotationSlice.actions.removePasteItemReducer())

    setTimeout(
      () => {
        dispatch(textSlice.actions.setEditable())
        dispatch(copySlice.actions.allowAllActions())
      },
      1000 * theme.block.animationDuration + 500,
    )
  }
}

export const usePasteClick = (): void => {
  useEffectOnce(() => {
    document.addEventListener('click', pasteItemOnClick)
  })

  useUnmount((): void => {
    document.removeEventListener('click', pasteItemOnClick)
  })
}
