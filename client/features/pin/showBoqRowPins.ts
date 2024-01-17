import { itemsSlice } from '@entities/items'
import { dispatch } from '@shared/clients'

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
