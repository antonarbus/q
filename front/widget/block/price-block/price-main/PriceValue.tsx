import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getPriceBlockHtmlFromStore } from '@entity/quotation/redux/getter/getPriceBlockHtmlFromStore'
import {
  updatePriceValue,
  useUpdateTotalPriceIfPricesAboveWereChanged,
  validateTotalPrice,
} from '@feature/blocks/update'
import { Tiptap } from '@shared/lib/tiptap/Tiptap'
import { type JSX, useRef } from 'react'
import type { Editor } from '@tiptap/react'
import { useSelector } from '@shared/lib/redux'

export const PriceValue = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()
  const isEditorActive = useSelector((state) => state.text.isEditable)

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
      onCreate={(params) => {
        validateTotalPrice({ editorRef, blockIndex: block.index })
      }}
      onUpdate={(params) => {
        updatePriceValue({ editorRef, blockIndex: block.index })
      }}
      sx={{
        textAlign: 'center',
      }}
      isEditorActive={isEditorActive}
    />
  )
}
