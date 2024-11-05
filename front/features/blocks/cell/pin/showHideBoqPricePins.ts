import { dispatch } from '@lib_instances/store'
import type { MutableRefObject } from 'react'
import { quotationSlice } from '@entities/quotation'
import { cls } from '@shared/consts/cls'

type Props = {
  e: MouseEvent
  blockIndex: number
  hidePinsClickHandlerRef: MutableRefObject<(e: MouseEvent) => void>
  isInitClickRef: MutableRefObject<boolean>
}

export const showHideBoqPricePins = ({
  e,
  blockIndex,
  hidePinsClickHandlerRef,
  isInitClickRef,
}: Props): void => {
  dispatch(quotationSlice.actions.showBoqPriceCellPinsReducer({ blockIndex }))

  const clickHandler = (event: MouseEvent): void => {
    if (isInitClickRef.current) {
      isInitClickRef.current = false

      return
    }

    const clickedElement = event.target
    if (clickedElement instanceof Element) {
      const isPin = Boolean(clickedElement.closest(`.${cls.pin}`))

      if (isPin) return

      document.removeEventListener('click', hidePinsClickHandlerRef.current)
    }

    dispatch(quotationSlice.actions.hideBoqPriceCellPinsReducer({ blockIndex }))
    document.removeEventListener('click', hidePinsClickHandlerRef.current)
    isInitClickRef.current = true
  }

  document.removeEventListener('click', hidePinsClickHandlerRef.current)
  isInitClickRef.current = true
  hidePinsClickHandlerRef.current = clickHandler
  document.addEventListener('click', hidePinsClickHandlerRef.current)
}
