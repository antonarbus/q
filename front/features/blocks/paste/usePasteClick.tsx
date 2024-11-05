import { dispatch, getState } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { useEffectOnce, useUnmount } from 'react-use'
import { copySlice } from '@entities/copy'
import { isFroalaSignal, quotationSlice } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { nanoid } from '@shared/lib/nanoid'
import { fixElementDimensionStyle } from '@shared/utils/fixElementDimensionStyle'
import { route } from '@shared/consts/route'

const pasteItemOnClick = (): void => {
  if (window.location.pathname.includes(route.bookmarks)) return
  if (window.location.pathname.includes(route.quotations)) return

  const isPasteTextShown = getState().copy.isPasteTextShown

  if (!isPasteTextShown) return

  dispatch(copySlice.actions.hidePasteText())

  const isPastable = getState().copy.isPastable

  if (!isPastable) return

  const { id, pastePos } = getState().copy.place
  const topItemInCopyModal = getState().copy.items[0]

  if (!topItemInCopyModal) return

  if (pastePos === 'middle') {
    const elementToBeReplaced = document.getElementById(id)

    if (elementToBeReplaced) {
      const paperElement = elementToBeReplaced.querySelector(`.${cls.paper}`)

      if (paperElement instanceof HTMLElement) {
        // width of animated element is changed for unknown reason, can't explain the issue, so let's fix it for animation purpose
        fixElementDimensionStyle({ element: paperElement })
      }
    }
  }

  const newItemId = nanoid(5)

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
        isFroalaSignal.value = true
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
