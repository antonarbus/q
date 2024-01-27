import { dispatch, getState } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { useEffectOnce, useUnmount } from 'react-use'
import { copySlice } from '@entities/copy'
import { itemsSlice, saveItemsLocally } from '@entities/items'
import { generalSlice } from '@shared/general'

const pasteItemOnClick = (): void => {
  const isPasteTextShown = getState().copy.isPasteTextShown

  if (!isPasteTextShown) return

  dispatch(copySlice.actions.hidePasteText())

  const isPastable = getState().copy.isPastable

  if (!isPastable) return

  const { itemId, pastePos } = getState().copy.place
  const topItemFromCopyContainer = getState().copy.items[0]

  if (!topItemFromCopyContainer) return

  dispatch(itemsSlice.actions.pasteItemReducer({
    item: topItemFromCopyContainer,
    itemId,
    pastePos,
  }))

  dispatch(copySlice.actions.removeItemFromCopyContainer())
  dispatch(copySlice.actions.forbidAllActions())

  setTimeout(() => {
    dispatch(copySlice.actions.allowAllActions())
  }, 1000 * theme.item.animationDuration)

  const itemsInCopyContainer = getState().copy.items

  if (itemsInCopyContainer.length === 0) {
    dispatch(copySlice.actions.hideCopyContainer())
    dispatch(itemsSlice.actions.removePasteItemReducer())

    // need more time than animation, otherwise some distortion is visible
    setTimeout(() => {
      dispatch(generalSlice.actions.enableFroala())
      saveItemsLocally({
        msgAboveItemWithIndex: 0, // todo: findIndex of this pasted item
      })
    }, 1000 * theme.item.animationDuration + 500)
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
