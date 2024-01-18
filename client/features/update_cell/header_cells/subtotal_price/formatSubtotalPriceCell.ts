import { dispatch } from '@lib_instances/store'
import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { roundTo } from 'round-to'
import { getBoqItemFromStore, itemsSlice } from '@entities/items'
import { getStringWithNewFormattedNumber } from '@shared/lib'

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
