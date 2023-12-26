import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { getTextContentFromHtml } from 'client/shared/lib'
import { type BoqRow } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'

type Props = {
  itemIndex: number
  subTotalEditor: FroalaEditor | null
}

export const updateSubTotalPrice = ({ itemIndex, subTotalEditor }: Props): void => {
  if (subTotalEditor === null) return

  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return

  const totalPrice: number = item.boq.rows.reduce((accumulator: number, boqRow: BoqRow) => {
    const price = boqRow.price.value
    return accumulator + price
  }, 0)

  const htmlValue = getTextContentFromHtml({ html: item.boq.header.price.html })
  const updatedHtml = item.boq.header.price.html.replace(String(htmlValue), String(totalPrice))

  dispatch(itemsSlice.actions.updateTotalPrice({
    itemIndex,
    html: updatedHtml,
    value: totalPrice,
  }))

  subTotalEditor.html.set(updatedHtml)
}
