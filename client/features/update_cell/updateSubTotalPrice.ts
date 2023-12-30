import { getBoqItem, getBoqRows, itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { getTextContent } from 'client/shared/lib'
import { type BoqRow } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'
import { roundTo } from 'round-to'

type Props = {
  itemIndex: number
  subTotalPriceEditor: FroalaEditor | null
}

export const updateSubTotalPrice = ({ itemIndex, subTotalPriceEditor }: Props): void => {
  if (subTotalPriceEditor === null) return

  const boqItem = getBoqItem({ itemIndex })
  if (boqItem === undefined) return

  const boqRows = getBoqRows({ itemIndex })
  if (boqRows === undefined) return

  const subTotalPrice: number = boqRows.reduce((accumulator: number, boqRow: BoqRow) => {
    const price = boqRow.price.value
    return accumulator + price
  }, 0)

  const subTotalPriceRounded = roundTo(subTotalPrice, 2)

  const htmlValue = getTextContent({ html: boqItem.boq.header.subTotalPrice.html })
  const updatedHtml = boqItem.boq.header.subTotalPrice.html.replace(String(htmlValue), String(subTotalPriceRounded))

  dispatch(itemsSlice.actions.updateTotalPrice({
    itemIndex,
    html: updatedHtml,
    value: subTotalPriceRounded,
  }))

  subTotalPriceEditor.html.set(updatedHtml)
}
