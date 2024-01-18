import { dispatch } from '@libras/store'
import { type MutableRefObject } from 'react'
import { itemsSlice } from '@entities/items'
import { className } from '@shared/className'

type Props = {
  e: MouseEvent
  itemIndex: number
  hidePinsClickHandlerRef: MutableRefObject<(e: MouseEvent) => void>
  isInitClickRef: MutableRefObject<boolean>
}

export const showHideBoqPricePins = ({
  e,
  itemIndex,
  hidePinsClickHandlerRef,
  isInitClickRef,
}: Props): void => {
  dispatch(itemsSlice.actions.showBoqPriceCellPinsReducer({ itemIndex }))

  const clickHandler = (e: MouseEvent): void => {
    if (isInitClickRef.current) {
      isInitClickRef.current = false
      return
    }

    const clickedElement = e.target
    if (clickedElement instanceof Element) {
      const isPin = Boolean(clickedElement.closest(`.${className.pin}`))

      if (isPin) return

      document.removeEventListener('click', hidePinsClickHandlerRef.current)
    }

    dispatch(itemsSlice.actions.hideBoqPriceCellPinsReducer({ itemIndex }))
    document.removeEventListener('click', hidePinsClickHandlerRef.current)
    isInitClickRef.current = true
  }

  document.removeEventListener('click', hidePinsClickHandlerRef.current)
  isInitClickRef.current = true
  hidePinsClickHandlerRef.current = clickHandler
  document.addEventListener('click', hidePinsClickHandlerRef.current)
}
