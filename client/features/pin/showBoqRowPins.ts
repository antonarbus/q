import { dispatch } from '@libras/store'
import { itemsSlice } from '@entities/items'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const showBoqRowPins = ({ itemIndex, rowIndex }: Props): void => {
  dispatch(itemsSlice.actions.showBoqRowCellPinReducer({
    itemIndex,
    rowIndex,
    boqColumnKey: 'itemPrice',
  }))

  dispatch(itemsSlice.actions.showBoqRowCellPinReducer({
    itemIndex,
    rowIndex,
    boqColumnKey: 'qty',
  }))
}
