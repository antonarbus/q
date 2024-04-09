import { dispatch } from '@lib_instances/store'
import { roundTo } from 'round-to'
import { getBoqItemFromStore, itemsSlice } from '@entities/quotation'
import { type FroalaEditorRef } from '@shared/types'
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

  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return

  const value = boqItem.boq.header.subTotalPrice.value
  if (value === null) return

  const roundedValue = roundTo(value, 2)

  const html = boqItem.boq.header.subTotalPrice.html

  const newHtml = getStringWithNewFormattedNumber({
    string: html,
    oldNumber: value,
    newNumber: roundedValue,
  })

  if (html === newHtml) return

  dispatch(itemsSlice.actions.updateSubTotalPriceReducer({
    itemIndex,
    html: newHtml,
    value: roundedValue,
  }))

  subTotalPriceEditorRef.current.html.set(newHtml)
}
