import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getPriceBlockHtmlFromStore } from '@entity/quotation/redux/getter/getPriceBlockHtmlFromStore'
import { TextEditor } from '@shared/component/TextEditor'
import { useRef } from 'react'
import type { Editor } from '@tiptap/react'
import { useUpdateTotalPriceIfPricesAboveWereChanged } from '@feature/blocks/yyy'
import { handleFocusOutFromTotalPrice } from '@feature/blocks/handle-focus-out-from-price-value-at-price-block/handleFocusOutFromTotalPrice'
import { handleChangeOfPriceValue } from '@feature/blocks/handle-change-of-price-value-at-price-block/handleChangeOfPriceValue'

export const PriceValue = (): React.JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  useUpdateTotalPriceIfPricesAboveWereChanged({
    blockIndex: block.index,
    editorRef,
  })

  return (
    <TextEditor
      editorRef={editorRef}
      className='price-value'
      placeholder='Total price...'
      contentGetter={() =>
        getPriceBlockHtmlFromStore({ blockIndex: block.index })
      }
      onCreate={(params) => {
        handleFocusOutFromTotalPrice({ editorRef, blockIndex: block.index })
      }}
      onUpdate={(params) => {
        handleChangeOfPriceValue({ editorRef, blockIndex: block.index })
      }}
      onBlur={() => {
        handleFocusOutFromTotalPrice({ editorRef, blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
        fontVariantNumeric: 'tabular-nums',
      }}
    />
  )
}
