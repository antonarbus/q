import hash from 'object-hash'
import { useEffectOnce, useUnmount } from 'react-use'
import { store } from 'client/store'
import { addPasteText, removePasteText } from 'client/offer/offerSlice'
import { savePastePlace } from './copySlice'

let prevPastePlace = { pastePos: 'top', itemId: 'some id' }

function movePasteTextAfterCursor(e: MouseEvent) {
  const itemsContainer = (e.target as Element).closest('#items')
  if (!itemsContainer) {
    store.dispatch(removePasteText())
    return
  }

  const item = (e.target as Element).closest('.item')
  if (!item) return

  const { height, top } = item.getBoundingClientRect()
  const yWithinElement = e.clientY - top

  const distToTop = yWithinElement
  const distToBottom = height - yWithinElement

  let pastePlace
  if (distToTop / height < 0.1) {
    pastePlace = { pastePos: 'top', itemId: item.id }
  } else if (distToBottom / height < 0.1) {
    pastePlace = { pastePos: 'bottom', itemId: item.id }
  } else {
    pastePlace = { pastePos: 'middle', itemId: item.id }
  }

  if (hash(prevPastePlace) === hash(pastePlace)) return

  store.dispatch(addPasteText(pastePlace))
  store.dispatch(savePastePlace(pastePlace))

  prevPastePlace = structuredClone(pastePlace)
}

function pasteItemOnClick(e: MouseEvent) {
  // console.log(e.target)
}

export const usePastePosition = () => {
  useEffectOnce(() => {
    document.addEventListener('mousemove', movePasteTextAfterCursor, { passive: true })
  })

  useUnmount(() => {
    document.removeEventListener('mousemove', movePasteTextAfterCursor)
  })

  useEffectOnce(() => {
    document.addEventListener('click', pasteItemOnClick)
  })

  useUnmount(() => {
    document.removeEventListener('click', pasteItemOnClick)
  })
}
