import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/app/store'
import { cleanItem } from 'client/shared/lib/itemsUtils'
import { copySlice, exitCopyMode } from 'client/entities/copy'
import { itemsSlice } from 'client/entities/items'
import { saveItemsLocally } from 'client/shared/lib'
import { theme } from 'client/shared/clients'

const pasteItemOnClick = (): void => {
  const isPasteTextShown = store.getState().copy.isPasteTextShown
  if (!isPasteTextShown) return
  store.dispatch(copySlice.actions.hidePasteText())
  const isPastable = store.getState().copy.isPastable
  if (!isPastable) return
  const { itemId, pastePos } = store.getState().copy.place
  const topItemFromCopyContainer = store.getState().copy.items[0]
  if (!topItemFromCopyContainer) return
  const cleanedItem = cleanItem(topItemFromCopyContainer)
  store.dispatch(copySlice.actions.removeItemFromCopyContainer())
  store.dispatch(itemsSlice.actions.pasteItem({ itemId, pastePos, item: cleanedItem }))
  store.dispatch(copySlice.actions.forbidToPaste())
  store.dispatch(copySlice.actions.forbidToCopy())
  store.dispatch(copySlice.actions.forbidToCut())
  store.dispatch(copySlice.actions.forbidToDelete())
  saveItemsLocally()
  const itemsInCopyContainer = store.getState().copy.items
  if (itemsInCopyContainer.length === 0) {
    store.dispatch(copySlice.actions.hideCopyContainer())
    store.dispatch(itemsSlice.actions.removePasteItem())
    exitCopyMode({ delayed: true })
  }
  setTimeout(() => {
    store.dispatch(copySlice.actions.allowToPaste())
    store.dispatch(copySlice.actions.allowToCopy())
    store.dispatch(copySlice.actions.allowToCut())
    store.dispatch(copySlice.actions.allowToDelete())
  }, 1000 * theme.item.animationDuration)
}

export const usePasteClick = (): void => {
  useEffectOnce(() => {
    document.addEventListener('click', pasteItemOnClick)
  })

  useUnmount((): void => {
    document.removeEventListener('click', pasteItemOnClick)
  })
}
