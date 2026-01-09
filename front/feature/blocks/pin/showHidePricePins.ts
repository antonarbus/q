import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { cls } from '@shared/cls'
import { dispatch } from '@shared/lib/redux'
import type { RefObject } from 'react'

type Props = {
  event: MouseEvent
  blockIndex: number
  hidePinsClickHandlerRef: RefObject<(e: MouseEvent) => void>
  isInitClickRef: RefObject<boolean>
}

export const showHidePricePins = (props: Props): void => {
  dispatch(
    quotationSlice.actions.showBoqPriceCellPinsReducer({
      blockIndex: props.blockIndex,
    }),
  )

  const clickHandler = (mouseEvent: MouseEvent): void => {
    if (props.isInitClickRef.current) {
      props.isInitClickRef.current = false

      return
    }

    const clickedElement = mouseEvent.target

    if (clickedElement instanceof Element) {
      const isPin = Boolean(clickedElement.closest(`.${cls.pin}`))

      if (isPin === true) {
        return
      }

      document.removeEventListener(
        'click',
        props.hidePinsClickHandlerRef.current,
      )
    }

    dispatch(
      quotationSlice.actions.hideBoqPriceCellPinsReducer({
        blockIndex: props.blockIndex,
      }),
    )

    document.removeEventListener('click', props.hidePinsClickHandlerRef.current)
    props.isInitClickRef.current = true
  }

  document.removeEventListener('click', props.hidePinsClickHandlerRef.current)
  props.isInitClickRef.current = true
  props.hidePinsClickHandlerRef.current = clickHandler
  document.addEventListener('click', props.hidePinsClickHandlerRef.current)
}
