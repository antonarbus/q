import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { hideCopyContainer, pasteItem, removeItemFromCopyContainer } from './copySlice'
import { saveOfferIntoLocalStorage } from 'client/modules/localStorage'

function pasteItemOnClick(e: MouseEvent) {
  const { itemId, pastePos } = store.getState().copy.place
  const item = store.getState().copy.items[0]
  if (pastePos === 'nowhere') return
  store.dispatch(pasteItem({ itemId, pastePos, item }))
  saveOfferIntoLocalStorage()
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
