import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getPriceBlockHtmlFromStore } from '@entity/quotation/redux/getter/getPriceBlockHtmlFromStore'
import {
  updatePriceValue,
  useUpdateTotalPriceIfPricesAboveWereChanged,
  validateTotalPrice,
} from '@feature/blocks/update'
import { TextEditor } from '@shared/component/TextEditor'
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
    <TextEditor
      editorRef={editorRef}
      className='price-value'
      placeholder='Total price...'
      content={getPriceBlockHtmlFromStore({ blockIndex: block.index })}
      onCreate={(params) => {
        validateTotalPrice({ editorRef, blockIndex: block.index })
      }}
      onUpdate={(params) => {
        updatePriceValue({ editorRef, blockIndex: block.index })
      }}
      onBlur={() => {
        validateTotalPrice({ editorRef, blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
      }}
    />
  )
}
