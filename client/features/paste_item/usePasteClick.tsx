import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/app/store'
import { cleanItem } from 'client/shared/lib/itemsUtils'
import { allowToCopy, allowToCut, allowToDelete, allowToPaste, exitCopyMode, forbidToCopy, forbidToCut, forbidToDelete, forbidToPaste, hideCopyContainer, hidePasteText, removeItemFromCopyContainer } from 'client/entities/copy'
import { pasteItem, removePasteItem } from 'client/entities/items'
import { saveItemsLocally } from 'client/shared/lib'
import { theme } from 'client/shared/clients'

const pasteItemOnClick = (): void => {
  const isPasteTextShown = store.getState().copy.isPasteTextShown
  if (!isPasteTextShown) return
  store.dispatch(hidePasteText())
  const isPastable = store.getState().copy.isPastable
  if (!isPastable) return
  const { itemId, pastePos } = store.getState().copy.place
  const topItemFromCopyContainer = store.getState().copy.items[0]
  if (!topItemFromCopyContainer) return
  const cleanedItem = cleanItem(topItemFromCopyContainer)
  store.dispatch(removeItemFromCopyContainer())
  store.dispatch(pasteItem({ itemId, pastePos, item: cleanedItem }))
  store.dispatch(forbidToPaste())
  store.dispatch(forbidToCopy())
  store.dispatch(forbidToCut())
  store.dispatch(forbidToDelete())
  saveItemsLocally()
  const itemsInCopyContainer = store.getState().copy.items
  if (itemsInCopyContainer.length === 0) {
    store.dispatch(hideCopyContainer())
    store.dispatch(removePasteItem())
    exitCopyMode({ delayed: true })
  }
  setTimeout(() => {
    store.dispatch(allowToPaste())
    store.dispatch(allowToCopy())
    store.dispatch(allowToCut())
    store.dispatch(allowToDelete())
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
