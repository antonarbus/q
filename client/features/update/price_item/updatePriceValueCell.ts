import { dispatch, getState } from '@lib_instances/store'
import { itemType, saveItemsLocally, itemsSlice } from '@entities/items'
import { getNumberFromString, getTextContentFromHtml } from '@shared/lib'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
}

export const updatePriceValueCell = ({
  editorRef,
  itemIndex,
}: Props): void => {
  if (editorRef.current === null) return

  const priceItem = getState().items[itemIndex]
  if (priceItem?.type !== itemType.price) return

  const prevHtml = priceItem.price.html
  const html = editorRef.current.html.get()
  const didHtmlChange = prevHtml !== html

  if (!didHtmlChange) return

  const cellTextContent = getTextContentFromHtml({ html })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  dispatch(itemsSlice.actions.updatePriceReducer({ itemIndex, html, value: cellValueFromHtml }))

  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
}
