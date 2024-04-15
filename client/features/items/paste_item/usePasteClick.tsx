import { dispatch, getState } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { useEffectOnce, useUnmount } from 'react-use'
import { copySlice } from '@entities/copy'
import { isItemsFroalaSignal, quotationSlice } from '@entities/quotation'
import { className } from '@shared/consts/className'
import { navItemId } from '@shared/consts/navItemId'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice } from '@shared/nav'
import { fixElementDimensionStyle } from '@shared/utils/fixElementDimensionStyle'

export const usePasteClick = (): void => {
  useEffectOnce(() => {
    document.addEventListener('click', pasteItemOnClick)
  })

  useUnmount((): void => {
    document.removeEventListener('click', pasteItemOnClick)
  })
}

function pasteItemOnClick(): void {
  const isPasteTextShown = getState().copy.isPasteTextShown

  if (!isPasteTextShown) return

  dispatch(copySlice.actions.hidePasteText())

  const isPastable = getState().copy.isPastable

  if (!isPastable) return

  const { itemId, pastePos } = getState().copy.place
  const topItemFromCopyContainer = getState().copy.items[0]

  if (!topItemFromCopyContainer) return

  if (pastePos === 'middle') {
    const elementToBeReplaced = document.getElementById(itemId)
    if (elementToBeReplaced) {
      const paperElement = elementToBeReplaced.querySelector(`.${className.paper}`)
      if (paperElement instanceof HTMLElement) {
        // width of animated element is changed for unknown reason, can't explain the issue, so let's fix it for animation purpose
        fixElementDimensionStyle({ element: paperElement })
      }
    }
  }

  const newItemId = nanoid(5)

  dispatch(quotationSlice.actions.pasteItemReducer({
    item: topItemFromCopyContainer,
    itemId,
    newItemId,
    pastePos,
  }))

  dispatch(copySlice.actions.removeItemFromCopyContainer())
  dispatch(copySlice.actions.forbidAllActions())

  setTimeout(() => {
    dispatch(copySlice.actions.allowAllActions())
    dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
  }, 1000 * theme.item.animationDuration)

  const itemsInCopyContainer = getState().copy.items

  if (itemsInCopyContainer.length === 0) {
    dispatch(copySlice.actions.hideCopyContainer())
    dispatch(quotationSlice.actions.removePasteItemReducer())

    setTimeout(() => {
      isItemsFroalaSignal.value = true
      dispatch(copySlice.actions.allowAllActions())
    }, 1000 * theme.item.animationDuration + 500)
  }
}
