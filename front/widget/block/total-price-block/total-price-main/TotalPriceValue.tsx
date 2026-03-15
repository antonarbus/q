import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getPriceBlockHtmlFromStore } from '@entity/quotation/redux/getter/getPriceBlockHtmlFromStore'
import { TextEditor } from '@shared/component/TextEditor'
import { useRef } from 'react'
import type { Editor } from '@tiptap/react'
import { useUpdateTotalPriceIfPricesAboveWereChanged } from '@feature/blocks/yyy'
import { focusOutFromTotalPrice } from '@feature/blocks/focus-out-from-price-value-at-price-block/focusOutFromTotalPrice'
import { changePriceValue } from '@feature/blocks/change-price-value-at-price-block/changePriceValue'

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
        focusOutFromTotalPrice({ editorRef, blockIndex: block.index })
      }}
      onUpdate={(params) => {
        changePriceValue({ editorRef, blockIndex: block.index })
      }}
      onBlur={() => {
        focusOutFromTotalPrice({ editorRef, blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
        fontVariantNumeric: 'tabular-nums',
      }}
    />
  )
}
