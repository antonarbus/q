import { itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'

type Props = {
  itemIndex: number
}

export const updateTotalPrice = ({ itemIndex }: Props): void => {
  dispatch(itemsSlice.actions.updateTotalPrice({ itemIndex }))
}
