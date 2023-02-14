// @ts-nocheck
import $ from 'jquery'
import hash from 'object-hash'
import { useEffectOnce, useUnmount } from 'react-use'
import { useDispatchTyped } from 'client/store'
import { addPasteText } from 'client/offer/offerSlice'
import { savePastePlace } from './copySlice'

let prevPastePlace = { pastePos: 'top', itemId: 'some id' }

export type PastePlace = {
  pastePos: 'top' | 'middle' | 'bottom'
  itemId: string
}

function getPastePlace({ e, el }): PastePlace {
  const upperBorder = +$(el).offset().top
  const lowerBorder = +$(el).offset().top + +$(el).outerHeight()
  const distToUpperBorder = e.pageY - upperBorder
  const distToLowerBorder = lowerBorder - e.pageY
  const elHeight = $(el).outerHeight()

  if (distToUpperBorder / elHeight < 0.1) return { pastePos: 'top', itemId: el.id }
  if (distToLowerBorder / elHeight < 0.1) return { pastePos: 'bottom', itemId: el.id }
  return { pastePos: 'middle', itemId: el.id }
}

export const usePastePosition = () => {
  const dispatch = useDispatchTyped()

  function listenForMousemove() {
    $(document).on('mousemove.items_namespace', '.item', function (e) {
      const pastePlace = getPastePlace({ e, el: this })
      if (hash(prevPastePlace) === hash(pastePlace)) return
      dispatch(addPasteText(pastePlace))
      dispatch(savePastePlace(pastePlace))
      prevPastePlace = structuredClone(pastePlace)
    })
  }

  useEffectOnce(listenForMousemove)
  useUnmount(() => { $(document).off('.items_namespace') })
}
