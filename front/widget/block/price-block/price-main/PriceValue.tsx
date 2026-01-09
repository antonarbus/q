import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getPriceBlockHtmlFromStore } from '@entity/quotation/redux/getter/getPriceBlockHtmlFromStore'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import {
  updatePriceValue,
  useUpdateTotalPriceIfPricesAboveWereChanged,
  validateTotalPrice,
} from '@feature/blocks/update'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'

export const PriceValue = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const block = useBlock()

  useUpdateTotalPriceIfPricesAboveWereChanged({
    blockIndex: block.index,
    editorRef,
  })

  return (
    <Froala
      editorRef={editorRef}
      htmlGetter={() => getPriceBlockHtmlFromStore({ blockIndex: block.index })}
      onBlur={() => {
        validateTotalPrice({ editorRef, blockIndex: block.index })
      }}
      onContentChange={() => {
        updatePriceValue({ editorRef, blockIndex: block.index })
      }}
      onInitialized={() => {
        validateTotalPrice({ editorRef, blockIndex: block.index })
      }}
      placeholder='Total price...'
    />
  )
}
