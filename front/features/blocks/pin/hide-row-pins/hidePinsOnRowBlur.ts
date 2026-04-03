import { getRowFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

type Props = {
  event: React.FocusEvent<HTMLDivElement>
  blockIndex: number
  rowIndex: number
}

export const hidePinsOnRowBlur = (props: Props): void => {
  const elementReceivedFocus = props.event.relatedTarget
  const pinClicked = elementReceivedFocus?.classList.contains(cls.pin)

  if (pinClicked === true) {
    return
  }

  const row = getRowFromStoreByIndex({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (row === undefined) {
    return
  }

  const isItemPricePinShown = row.itemPrice.pin.isShown

  if (isItemPricePinShown === true) {
    reduxHolder.dispatch(
      quotationSlice.actions.hideCellPin({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'itemPrice',
      }),
    )
  }

  const isQtyPinShown = row.qty.pin.isShown

  if (isQtyPinShown === true) {
    reduxHolder.dispatch(
      quotationSlice.actions.hideCellPin({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'qty',
      }),
    )
  }
}
