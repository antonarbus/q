// @ts-nocheck
import $ from 'jquery'
import { useEffectOnce } from 'react-use'
import { useDispatchTyped } from 'client/store'
import { movePasteText } from 'client/offer/offerSlice'
import hash from 'object-hash'

let prevPastePlace = { pastePos: null, pasteId: null }

function getPastePlace({ e, el }) {
  const upperBorder = +$(el).offset().top
  const lowerBorder = +$(el).offset().top + +$(el).outerHeight()
  const distToUpperBorder = e.pageY - upperBorder
  const distToLowerBorder = lowerBorder - e.pageY
  const elHeight = $(el).outerHeight()

  if (distToUpperBorder / elHeight < 0.35) return { pastePos: 'top', pasteId: el.id }
  if (distToLowerBorder / elHeight < 0.35) return { pastePos: 'bottom', pasteId: el.id }
  return { pastePos: 'middle', pasteId: el.id }
}

export const usePasteCords = () => {
  const dispatch = useDispatchTyped()

  function listenForMousemove() {
    $(document).on('mousemove.items_namespace', '.item', function (e) {
      const pastePlace = getPastePlace({ e, el: this })
      if (hash(prevPastePlace) === hash(pastePlace)) return
      dispatch(movePasteText(pastePlace))
      prevPastePlace = structuredClone(pastePlace)
    })

    return () => {
      $(document).off('.items_namespace')
    }
  }

  useEffectOnce(listenForMousemove)
}
