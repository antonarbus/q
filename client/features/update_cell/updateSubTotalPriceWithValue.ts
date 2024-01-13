import { getNumberFromString, getTextContentFromHtml, getStringWithNewFormattedNumber, updateNumberInHtmlIncrementally } from 'client/shared/lib'
import { getBoqItemFromStore, getBoqRowsFromStore, itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { type BoqRow } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'
import { roundTo } from 'round-to'

type Props = {
  itemIndex: number
  subTotalPriceEditor: FroalaEditor | null
  value: number
}

export const updateSubTotalPriceWithValue = ({
  itemIndex,
  subTotalPriceEditor,
  value,
}: Props): void => {
  if (subTotalPriceEditor === null) return

  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return

  const boqRows = getBoqRowsFromStore({ itemIndex })
  if (boqRows === undefined) return

  const subTotalPriceValueCurrent = boqItem.boq.header.subTotalPrice.value

  // const subTotalPriceValueNew: number = boqRows.reduce((accumulator: number, boqRow: BoqRow) => {
  //   const price = boqRow.price.value
  //   return accumulator + price
  // }, 0)

  // const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

  const subTotalPriceTextContent = getTextContentFromHtml({
    html: boqItem.boq.header.subTotalPrice.html,
  })

  const subTotalPriceValueFromHtml = getNumberFromString({
    string: subTotalPriceTextContent,
  })

  const updatedHtml = getStringWithNewFormattedNumber({
    string: boqItem.boq.header.subTotalPrice.html,
    oldNumber: subTotalPriceValueFromHtml,
    newNumber: value,
  })

  dispatch(itemsSlice.actions.updateSubTotalPriceReducer({
    itemIndex,
    html: updatedHtml,
    value,
  }))

  void updateNumberInHtmlIncrementally({
    oldNumber: subTotalPriceValueCurrent,
    newNumber: value,
    editor: subTotalPriceEditor,
    html: boqItem.boq.header.subTotalPrice.html,
  })
}
