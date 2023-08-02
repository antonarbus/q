import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/app/store'
import { cleanItem } from 'utils/itemsUtils'
import { theme } from 'client/shared/clients'
import { exitFromCopyMode, hideCopyContainer, removeItemFromCopyContainer } from 'client/entities/copy'
import { pasteItem, removePasteItem } from 'client/entities/items'
import { saveItemsLocally } from 'client/features/save_items_locally'

function pasteItemOnClick() {
  const isPasteTextShown = store.getState().copy.isPasteTextShown
  if (!isPasteTextShown) return
  const { itemId, pastePos } = store.getState().copy.place
  const topItemFromCopyContainer = store.getState().copy.items[0]
  const cleanedItem = cleanItem(topItemFromCopyContainer)
  store.dispatch(removeItemFromCopyContainer())
  store.dispatch(pasteItem({ itemId, pastePos, item: cleanedItem }))
  saveItemsLocally()
  const itemsInCopyContainer = store.getState().copy.items
  if (itemsInCopyContainer.length === 0) {
    store.dispatch(hideCopyContainer())
    store.dispatch(removePasteItem())
    setTimeout(
      () => {
        // timeout to let animation end and completely go out from the copy-mode
        // to let froala initialize after animation to avoid motion staggering
        store.dispatch(exitFromCopyMode())
      },
      1000 * theme.item.animationDuration + 500
    )
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
