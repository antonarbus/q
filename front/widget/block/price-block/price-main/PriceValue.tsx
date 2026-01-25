import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getPriceBlockHtmlFromStore } from '@entity/quotation/redux/getter/getPriceBlockHtmlFromStore'
import {
  updatePriceValue,
  useUpdateTotalPriceIfPricesAboveWereChanged,
  // validateTotalPrice,
} from '@feature/blocks/update'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import { type JSX, useRef } from 'react'
import type { Editor } from '@tiptap/react'

export const PriceValue = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  useUpdateTotalPriceIfPricesAboveWereChanged({
    blockIndex: block.index,
    editorRef,
  })

  return (
    /*
    <Froala
      onBlur={() => {
        validateTotalPrice({ editorRef, blockIndex: block.index })
      }}
      onInitialized={() => {
        validateTotalPrice({ editorRef, blockIndex: block.index })
      }}
    />
    */
    <Tiptap
      editorRef={editorRef}
      className='price-value'
      placeholder='Total price...'
      content={getPriceBlockHtmlFromStore({ blockIndex: block.index })}
      onContentChange={(params) => {
        updatePriceValue({ editorRef, blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
      }}
    />
  )
}
