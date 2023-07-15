import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { hideCopyContainer, pasteItem, removeItemFromCopyContainer } from './copySlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { tellItemsSavedLocally } from '../bottom msg/bottomMsgSlice'
import { cleanItem } from 'utils/itemsUtils'
import { theme } from 'client/theme'

function pasteItemOnClick() {
  const isPasteTextShown = store.getState().copy.isPasteTextShown
  if (!isPasteTextShown) return
  const { itemId, pastePos } = store.getState().copy.place
  const topItemFromCopyContainer = store.getState().copy.items[0]
  const cleanedItem = cleanItem(topItemFromCopyContainer)
  store.dispatch(pasteItem({ itemId, pastePos, item: cleanedItem }))
  saveItemsIntoLocalStorage()
  store.dispatch(tellItemsSavedLocally())
  store.dispatch(removeItemFromCopyContainer())
  const itemsInCopyContainer = store.getState().copy.items
  if (itemsInCopyContainer.length === 0) {
    // todo: close copy container immediately
    // todo: but copyMode to be false with delay
    setTimeout(() => {
      store.dispatch(hideCopyContainer())
    }, 1000 * theme.item.animationDuration)
  }
}

export const usePasteClick = () => {
  useEffectOnce(() => {
    document.addEventListener('click', pasteItemOnClick)
  })

  useUnmount(() => {
    document.removeEventListener('click', pasteItemOnClick)
  })
}
