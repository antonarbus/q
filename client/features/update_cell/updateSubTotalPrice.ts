import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { getTextContentFromHtml } from 'client/shared/lib'
import { type BoqRow } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'
import { roundTo } from 'round-to'

type Props = {
  itemIndex: number
  subTotalPriceEditor: FroalaEditor | null
}

export const updateSubTotalPrice = ({ itemIndex, subTotalPriceEditor }: Props): void => {
  if (subTotalPriceEditor === null) return

  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return

  const boqRows = item.boq.rows

  const subTotalPrice: number = boqRows.reduce((accumulator: number, boqRow: BoqRow) => {
    const price = boqRow.price.value
    return accumulator + price
  }, 0)

  const subTotalPriceRounded = roundTo(subTotalPrice, 2)

  const htmlValue = getTextContentFromHtml({ html: item.boq.header.subTotalPrice.html })
  const updatedHtml = item.boq.header.subTotalPrice.html.replace(String(htmlValue), String(subTotalPriceRounded))

  dispatch(itemsSlice.actions.updateTotalPrice({
    itemIndex,
    html: updatedHtml,
    value: subTotalPriceRounded,
  }))

  subTotalPriceEditor.html.set(updatedHtml)
}
