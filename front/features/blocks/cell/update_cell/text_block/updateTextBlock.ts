import { dispatch, getState } from '@shared/lib/redux'
import { itemType, quotationSlice } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
}

export const updateTextBlock = ({ editorRef, blockIndex }: Props): void => {
  if (editorRef.current === null) {
    return
  }

  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.text) {
    return
  }

  const prevHtml = block.text.html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html

  if (!didTextChange) {
    return
  }

  dispatch(quotationSlice.actions.updateBlockTextReducer({ blockIndex, html }))
}
