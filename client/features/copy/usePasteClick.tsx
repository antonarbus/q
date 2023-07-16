import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { exitFromCopyMode, hideCopyContainer, pasteItem, removeItemFromCopyContainer } from './copySlice'
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
    store.dispatch(hideCopyContainer())
    setTimeout(() => {
      // timeout to let animation end and completely go out from the copy-mode
      // to let froala initialize after animation to avoid motion staggering
      store.dispatch(exitFromCopyMode())
    }, 1000 * theme.item.animationDuration + 500)
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
