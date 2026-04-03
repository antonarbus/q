import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const pinPriceCell = (props: Props): void => {
  reduxHolder.dispatch(
    quotationSlice.actions.pinPrice({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
    }),
  )
}
