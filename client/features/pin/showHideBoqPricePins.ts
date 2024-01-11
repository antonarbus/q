import { itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { className } from 'client/shared/className'
import { type MutableRefObject } from 'react'

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

    console.log('🚀 ~ clickHandler')

    const clickedElement = e.target
    if (clickedElement instanceof Element) {
      const isPin = clickedElement.classList.contains(className.pin)
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
