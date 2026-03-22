import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { dispatch } from '@front/shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const pinPriceCell = (props: Props): void => {
  dispatch(
    quotationSlice.actions.pinPrice({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
    }),
  )
}
