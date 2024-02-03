import { dispatch, getState } from '@lib_instances/store'
import { itemType, itemsSlice, saveItemsLocally } from '@entities/items'
import { getNumberFromString, getTextContentFromHtml } from '@shared/lib'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
}

type Res = {
  didUpdate: boolean
}

export const updatePriceAtStore = ({
  editorRef,
  itemIndex,
}: Props): Res => {
  if (editorRef.current === null) {
    return {
      didUpdate: false,
    }
  }

  const priceItem = getState().items[itemIndex]
  if (priceItem?.type !== itemType.price) {
    return {
      didUpdate: false,
    }
  }

  const prevHtml = priceItem.price.html
  const html = editorRef.current.html.get()
  const didHtmlChange = prevHtml !== html

  if (!didHtmlChange) {
    return {
      didUpdate: false,
    }
  }

  const cellTextContent = getTextContentFromHtml({ html })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  dispatch(itemsSlice.actions.updatePriceReducer({ itemIndex, html, value: cellValueFromHtml }))

  return {
    didUpdate: true,
  }
}
