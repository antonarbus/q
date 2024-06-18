import { dispatch, getState } from '@lib_instances/store'
import { itemKey, quotationSlice } from '@entities/quotation'
import { type FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
}

export const updatePriceTitleCell = ({ editorRef, itemIndex }: Props): void => {
  if (editorRef.current === null) return

  const priceItem = getState().quotation.items[itemIndex]
  if (priceItem?.type !== itemKey.price) return

  const prevHtml = priceItem.title.html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html

  if (!didTextChange) return

  dispatch(quotationSlice.actions.updatePriceTitleReducer({ itemIndex, html }))
}
