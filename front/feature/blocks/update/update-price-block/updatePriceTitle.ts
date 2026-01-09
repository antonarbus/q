import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { dispatch, getState } from '@shared/lib/redux'

type Props = {
  editorRef: FroalaEditorRef
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
  const html = props.editorRef.current.html.get()
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
