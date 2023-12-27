import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { getTextContentFromHtml } from 'client/shared/lib'
import { type BoqRow } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'

type Props = {
  itemIndex: number
  priceCellEditor: FroalaEditor | null
}

export const updatePriceCell = ({ itemIndex, priceCellEditor }: Props): void => {
  if (priceCellEditor === null) return

  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return

  const boqRows = item.boq.rows

  const subTotalPrice: number = boqRows.reduce((accumulator: number, boqRow: BoqRow) => {
    const price = boqRow.price.value
    return accumulator + price
  }, 0)

  const htmlValue = getTextContentFromHtml({ html: item.boq.header.price.html })
  const updatedHtml = item.boq.header.price.html.replace(String(htmlValue), String(subTotalPrice))

  dispatch(itemsSlice.actions.updateTotalPrice({
    itemIndex,
    html: updatedHtml,
    value: subTotalPrice,
  }))

  priceCellEditor.html.set(updatedHtml)
}
