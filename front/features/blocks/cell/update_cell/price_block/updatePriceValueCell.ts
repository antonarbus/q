import { dispatch, getState } from '@lib_instances/store'
import { itemType, quotationSlice } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/types/froala'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
}

export const updatePriceValueCell = ({
  editorRef,
  blockIndex,
}: Props): void => {
  if (editorRef.current === null) return

  const priceBlock = getState().quotation.blocks[blockIndex]
  if (priceBlock?.type !== itemType.price) return

  const prevHtml = priceBlock.price.html
  const html = editorRef.current.html.get()
  const didHtmlChange = prevHtml !== html

  if (!didHtmlChange) return

  const cellTextContent = getTextContentFromHtml({ html })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  dispatch(
    quotationSlice.actions.updatePriceReducer({
      blockIndex,
      html,
      value: cellValueFromHtml,
    }),
  )
}
