import { dispatch, getState } from '@lib_instances/store'
import { itemKey, quotationSlice } from '@entities/quotation'
import { type FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
}

export const updateTextBlock = ({ editorRef, itemIndex }: Props): void => {
  if (editorRef.current === null) return

  const block = getState().quotation.blocks[itemIndex]
  if (block?.type !== itemKey.text) return

  const prevHtml = block.text.html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  dispatch(quotationSlice.actions.updateBlockTextReducer({ itemIndex, html }))
}
