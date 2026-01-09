import { getBoqBlockFromStore } from '@entity/quotation/redux/getter/getBoqBlockFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { dispatch } from '@shared/lib/redux'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { roundTo } from 'round-to'

type Props = {
  blockIndex: number
  subTotalPriceEditorRef: FroalaEditorRef
}

export const formatSubtotalPrice = (props: Props): void => {
  if (props.subTotalPriceEditorRef.current === null) {
    return
  }

  const boqBlock = getBoqBlockFromStore({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return
  }

  const roundedValue = roundTo(boqBlock.boq.header.subTotalPrice.value, 2)

  const newHtml = getStringWithNewFormattedNumber({
    string: boqBlock.boq.header.subTotalPrice.html,
    newNumber: roundedValue,
  })

  if (boqBlock.boq.header.subTotalPrice.html === newHtml) {
    return
  }

  dispatch(
    quotationSlice.actions.updateSubTotalPriceReducer({
      blockIndex: props.blockIndex,
      html: newHtml,
      value: roundedValue,
    }),
  )

  props.subTotalPriceEditorRef.current.html.set(newHtml)
}
