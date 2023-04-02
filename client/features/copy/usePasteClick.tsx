import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { hideCopyContainer, pasteItem, removeItemFromCopyContainer } from './copySlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { resetMsgOnBottom, showMsgOnBottom } from '../bottom msg/bottomMsgSlice'

function pasteItemOnClick() {
  const isPasteTextShown = store.getState().copy.isPasteTextShown
  if (!isPasteTextShown) return
  const { itemId, pastePos } = store.getState().copy.place
  const item = store.getState().copy.items[0]
  store.dispatch(pasteItem({ itemId, pastePos, item }))
  saveItemsIntoLocalStorage()
  store.dispatch(showMsgOnBottom('saved locally'))
  setTimeout(() => {
    store.dispatch(resetMsgOnBottom())
  }, 1500)
  store.dispatch(removeItemFromCopyContainer())
  const items = store.getState().copy.items
  if (items.length === 0) store.dispatch(hideCopyContainer())
}

export const usePasteClick = () => {
  useEffectOnce(() => {
    document.addEventListener('click', pasteItemOnClick)
  })

  useUnmount(() => {
    document.removeEventListener('click', pasteItemOnClick)
  })
}
