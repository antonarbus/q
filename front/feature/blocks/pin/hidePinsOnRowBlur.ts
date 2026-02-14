import { getRowFromStore } from '@entity/quotation/redux/getter/getRowFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { cls } from '@shared/cls'
import { dispatch } from '@shared/lib/redux'

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

  const row = getRowFromStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (row === undefined) {
    return
  }

  const isItemPricePinShown = row.itemPrice.pin.isShown

  if (isItemPricePinShown === true) {
    dispatch(
      quotationSlice.actions.hideCellPinReducer({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'itemPrice',
      }),
    )
  }

  const isQtyPinShown = row.qty.pin.isShown

  if (isQtyPinShown === true) {
    dispatch(
      quotationSlice.actions.hideCellPinReducer({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'qty',
      }),
    )
  }
}
