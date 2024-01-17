import { useEffectOnce, useUnmount } from 'react-use'
import { appSlice } from '@entities/app'
import { copySlice } from '@entities/copy'
import { itemsSlice } from '@entities/items'
import { dispatch, getState, theme } from '@shared/clients'
import { saveItemsLocally } from '@shared/lib'

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
  dispatch(copySlice.actions.forbidToPaste())
  dispatch(copySlice.actions.forbidToCopy())
  dispatch(copySlice.actions.forbidToCut())
  dispatch(copySlice.actions.forbidToDelete())
  saveItemsLocally()

  setTimeout(() => {
    dispatch(copySlice.actions.allowToPaste())
    dispatch(copySlice.actions.allowToCopy())
    dispatch(copySlice.actions.allowToCut())
    dispatch(copySlice.actions.allowToDelete())
  }, 1000 * theme.item.animationDuration)

  const itemsInCopyContainer = getState().copy.items

  if (itemsInCopyContainer.length === 0) {
    dispatch(copySlice.actions.hideCopyContainer())
    dispatch(itemsSlice.actions.removePasteItemReducer())

    // need more time than animation, otherwise some distortion is visible
    setTimeout(() => {
      dispatch(appSlice.actions.enableFroala())
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
