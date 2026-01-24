import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { dispatch, getState } from '@shared/lib/redux'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  editorRef: EditorRef
  blockIndex: number
}

export const updatePriceTitle = (props: Props): void => {
  if (props.editorRef.current === null) {
    return
  }

  const priceBlock = getState().quotation.blocks[props.blockIndex]

  if (priceBlock?.type !== 'price') {
    return
  }

  const prevHtml = priceBlock.title.html
  const html = props.editorRef.current.getHTML()
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return
  }

  dispatch(
    quotationSlice.actions.updatePriceTitleReducer({
      blockIndex: props.blockIndex,
      html,
    }),
  )
}
