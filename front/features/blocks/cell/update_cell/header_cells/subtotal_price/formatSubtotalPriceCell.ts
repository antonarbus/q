import { dispatch } from '@shared/lib/redux'
import { roundTo } from 'round-to'
import { getBoqBlockFromStore, quotationSlice } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/types/froala'
import { getStringWithNewFormattedNumber } from '@shared/utils/getStringWithNewFormattedNumber'

type Props = {
  blockIndex: number
  subTotalPriceEditorRef: FroalaEditorRef
}

export const formatSubtotalPriceCell = ({
  blockIndex,
  subTotalPriceEditorRef,
}: Props): void => {
  if (subTotalPriceEditorRef.current === null) return

  const boqBlock = getBoqBlockFromStore({ blockIndex })
  if (boqBlock === undefined) return

  const value = boqBlock.boq.header.subTotalPrice.value

  const roundedValue = roundTo(value, 2)

  const html = boqBlock.boq.header.subTotalPrice.html

  const newHtml = getStringWithNewFormattedNumber({
    string: html,
    oldNumber: value,
    newNumber: roundedValue,
  })

  if (html === newHtml) return

  dispatch(
    quotationSlice.actions.updateSubTotalPriceReducer({
      blockIndex,
      html: newHtml,
      value: roundedValue,
    }),
  )

  subTotalPriceEditorRef.current.html.set(newHtml)
}
