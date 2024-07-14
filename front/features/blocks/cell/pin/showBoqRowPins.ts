import { dispatch } from '@lib_instances/store'
import {
  boqRowCellKey,
  getBoqRowByIndexFromStore,
  quotationSlice,
} from '@entities/quotation'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const showBoqRowPins = ({ blockIndex, rowIndex }: Props): void => {
  const boqRow = getBoqRowByIndexFromStore({ blockIndex, rowIndex })
  if (boqRow === undefined) return

  const isItemPricePinShown = boqRow.itemPrice.pin.isShown

  if (!isItemPricePinShown) {
    dispatch(
      quotationSlice.actions.showBoqRowCellPinReducer({
        blockIndex,
        rowIndex,
        boqRowCellKey: boqRowCellKey.itemPrice,
      }),
    )
  }

  const isQtyPinShown = boqRow.qty.pin.isShown

  if (!isQtyPinShown) {
    dispatch(
      quotationSlice.actions.showBoqRowCellPinReducer({
        blockIndex,
        rowIndex,
        boqRowCellKey: boqRowCellKey.qty,
      }),
    )
  }
}
