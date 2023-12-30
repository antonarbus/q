import { getState } from 'client/shared/clients'
import { getNumber, getTextContent } from 'client/shared/lib'
import type FroalaEditor from 'froala-editor'
import { updateBoqCell } from './updateBoqCell'
import { roundTo } from 'round-to'

type Props = {
  itemIndex: number
  rowIndex: number
  priceCellEditor: FroalaEditor | null
}

export const updatePriceCell = ({ itemIndex, rowIndex, priceCellEditor }: Props): void => {
  if (priceCellEditor === null) return

  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return

  const row = item.boq.rows[rowIndex]
  if (row === undefined) return

  const newPriceValue = row.qty.value * row.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  const priceTextContent = getTextContent({ html: row.price.html })
  const priceValue = getNumber({ string: priceTextContent })
  const searchText = String(priceValue)
  const regExpOutsideHtmlTags = new RegExp(`(?![^<>]*>)${searchText}`, 'g')
  const updatedHtml = row.price.html.replace(regExpOutsideHtmlTags, String(newPriceValueRounded))

  updateBoqCell({
    itemIndex,
    rowIndex,
    boqColumnKey: 'price',
    html: updatedHtml,
  })

  priceCellEditor.html.set(updatedHtml)
}
