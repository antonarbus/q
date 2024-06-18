import { dispatch } from '@lib_instances/store'
import {
  boqRowCellKey,
  getBoqRowFromStore,
  quotationSlice,
} from '@entities/quotation'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const showBoqRowPins = ({ itemIndex, rowIndex }: Props): void => {
  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const isItemPricePinShown = boqRow.itemPrice.pin.isShown

  if (!isItemPricePinShown) {
    dispatch(
      quotationSlice.actions.showBoqRowCellPinReducer({
        itemIndex,
        rowIndex,
        boqRowCellKey: boqRowCellKey.itemPrice,
      }),
    )
  }

  const isQtyPinShown = boqRow.qty.pin.isShown

  if (!isQtyPinShown) {
    dispatch(
      quotationSlice.actions.showBoqRowCellPinReducer({
        itemIndex,
        rowIndex,
        boqRowCellKey: boqRowCellKey.qty,
      }),
    )
  }
}
