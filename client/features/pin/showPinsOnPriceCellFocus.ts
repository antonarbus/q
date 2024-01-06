import { itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const showPinsOnPriceCellFocus = ({ itemIndex, rowIndex }: Props): void => {
  dispatch(itemsSlice.actions.showBoqRowCellPin({
    itemIndex,
    rowIndex,
    boqColumnKey: 'itemPrice',
  }))

  dispatch(itemsSlice.actions.showBoqRowCellPin({
    itemIndex,
    rowIndex,
    boqColumnKey: 'qty',
  }))
}
