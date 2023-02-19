import hash from 'object-hash'
import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { updatePastePos } from './copySlice'
import { CopyPlaceType } from 'client/types'

function pasteItemOnClick(e: MouseEvent) {
  const { itemId, pastePos } = store.getState().copy.place
  if (pastePos === 'nowhere') return
  console.log({ itemId, pastePos })
}

export const usePasteClick = () => {
  useEffectOnce(() => {
    document.addEventListener('click', pasteItemOnClick)
  })

  useUnmount(() => {
    document.removeEventListener('click', pasteItemOnClick)
  })
}
