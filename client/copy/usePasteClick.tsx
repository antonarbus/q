import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { paste } from 'client/offer/offerSlice'
import { removePasteText } from './copySlice'

function pasteItemOnClick(e: MouseEvent) {
  const { itemId, pastePos } = store.getState().copy.place
  const item = store.getState().copy.items[0]
  if (pastePos === 'nowhere') return
  store.dispatch(removePasteText())
  store.dispatch(paste({ itemId, pastePos, item }))
}

export const usePasteClick = () => {
  useEffectOnce(() => {
    document.addEventListener('click', pasteItemOnClick)
  })

  useUnmount(() => {
    document.removeEventListener('click', pasteItemOnClick)
  })
}
