import { useEffectOnce } from 'react-use'
import $ from 'jquery'

export const usePasteCords = () => {
  function followCursor(e: MouseEvent) {
    // console.log({ x: e.pageX, y: e.pageY })

    const upperBorder = +$(this).offset().top
    const lowerBorder = +$(this).offset().top + +$(this).outerHeight()
    const distToUpperBorder = e.pageY - upperBorder
    const distToLowerBorder = lowerBorder - e.pageY
    const elHeight = $(this).outerHeight()

    console.log({
      upperBorder,
      lowerBorder,
      distToUpperBorder,
      distToLowerBorder,
      elHeight
    })
  }

  function listenForMousemove() {
    $(document).on('mousemove.items_namespace', '.item', followCursor)
    return () => { $(document).off('.items_namespace') }
  }

  useEffectOnce(listenForMousemove)
}
