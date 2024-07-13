import { dispatch } from '@lib_instances/store'
import { roundTo } from 'round-to'
import { getBoqBlockFromStore, quotationSlice } from '@entities/quotation'
import { type FroalaEditorRef } from '@shared/types/froala'
import { getStringWithNewFormattedNumber } from '@shared/utils'

type Props = {
  itemIndex: number
  subTotalPriceEditorRef: FroalaEditorRef
}

export const formatSubtotalPriceCell = ({
  itemIndex,
  subTotalPriceEditorRef,
}: Props): void => {
  if (subTotalPriceEditorRef.current === null) return

  const boqBlock = getBoqBlockFromStore({ itemIndex })
  if (boqBlock === undefined) return

  const value = boqBlock.boq.header.subTotalPrice.value
  if (value === null) return

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
      itemIndex,
      html: newHtml,
      value: roundedValue,
    }),
  )

  subTotalPriceEditorRef.current.html.set(newHtml)
}
