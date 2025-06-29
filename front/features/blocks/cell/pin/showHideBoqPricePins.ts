import { dispatch } from '@shared/lib/redux'
import { quotationSlice } from '@entities/quotation'
import { cls } from '@shared/const/cls'

type Props = {
  event: MouseEvent
  blockIndex: number
  hidePinsClickHandlerRef: React.RefObject<(e: MouseEvent) => void>
  isInitClickRef: React.RefObject<boolean>
}

export const showHideBoqPricePins = ({
  event,
  blockIndex,
  hidePinsClickHandlerRef,
  isInitClickRef,
}: Props): void => {
  dispatch(quotationSlice.actions.showBoqPriceCellPinsReducer({ blockIndex }))

  const clickHandler = (mouseEvent: MouseEvent): void => {
    if (isInitClickRef.current) {
      isInitClickRef.current = false

      return
    }

    const clickedElement = mouseEvent.target

    if (clickedElement instanceof Element) {
      const isPin = Boolean(clickedElement.closest(`.${cls.pin}`))

      if (isPin === true) {
        return
      }

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
