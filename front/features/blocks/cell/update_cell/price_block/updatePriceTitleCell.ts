import { dispatch, getState } from '@shared/lib/redux'
import { itemType, quotationSlice } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
}

export const updatePriceTitleCell = ({
  editorRef,
  blockIndex,
}: Props): void => {
  if (editorRef.current === null) {
    return
  }

  const priceBlock = getState().quotation.blocks[blockIndex]

  if (priceBlock?.type !== itemType.price) {
    return
  }

  const prevHtml = priceBlock.title.html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return
  }

  dispatch(quotationSlice.actions.updatePriceTitleReducer({ blockIndex, html }))
}
