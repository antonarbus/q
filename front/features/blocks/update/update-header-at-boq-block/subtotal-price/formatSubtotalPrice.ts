import { getBoqBlockFromStore } from '@entities/quotation/redux/getter/getBoqBlockFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { dispatch } from '@shared/lib/redux'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { roundTo } from 'round-to'

type Props = {
  blockIndex: number
  subTotalPriceEditorRef: FroalaEditorRef
}

export const formatSubtotalPrice = ({
  blockIndex,
  subTotalPriceEditorRef,
}: Props): void => {
  if (subTotalPriceEditorRef.current === null) {
    return
  }

  const boqBlock = getBoqBlockFromStore({ blockIndex })

  if (boqBlock === undefined) {
    return
  }

  const { subTotalPrice } = boqBlock.boq.header

  const roundedValue = roundTo(subTotalPrice.value, 2)

  const newHtml = getStringWithNewFormattedNumber({
    string: subTotalPrice.html,
    newNumber: roundedValue,
  })

  if (subTotalPrice.html === newHtml) {
    return
  }

  dispatch(
    quotationSlice.actions.updateSubTotalPriceReducer({
      blockIndex,
      html: newHtml,
      value: roundedValue,
    }),
  )

  subTotalPriceEditorRef.current.html.set(newHtml)
}
