import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { dispatch, getState } from '@shared/lib/redux'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
}

export const updateTextBlock = (props: Props): void => {
  if (props.editorRef.current === null) {
    return
  }

  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'text') {
    return
  }

  const prevHtml = block.text.html
  const html = props.editorRef.current.html.get()
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return
  }

  dispatch(
    quotationSlice.actions.updateBlockTextReducer({
      blockIndex: props.blockIndex,
      html,
    }),
  )
}
