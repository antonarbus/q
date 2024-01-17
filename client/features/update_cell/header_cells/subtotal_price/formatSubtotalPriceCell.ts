import { dispatch } from '@shared/clients'
import { getStringWithNewFormattedNumber } from '@shared/lib'
import type FroalaEditor from 'froala-editor'
import { roundTo } from 'round-to'
import { getBoqItemFromStore, itemsSlice } from '@entities/items'
import { type MutableRefObject } from 'react'

type Props = {
  itemIndex: number
  subTotalPriceEditorRef: MutableRefObject<FroalaEditor | null>
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

  // if (html === newHtml) return

  dispatch(itemsSlice.actions.updateSubTotalPriceReducer({
    itemIndex,
    html: newHtml,
    value: roundedValue,
  }))

  subTotalPriceEditorRef.current.html.set(newHtml)
}
