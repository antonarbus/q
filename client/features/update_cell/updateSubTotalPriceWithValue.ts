import { getNumberFromString, getTextContentFromHtml, getStringWithNewFormattedNumber, updateNumberInHtmlIncrementally } from 'client/shared/lib'
import { getBoqItemFromStore, getBoqRowsFromStore, itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import type FroalaEditor from 'froala-editor'

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
