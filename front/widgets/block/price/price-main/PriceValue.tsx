import {
  Froala,
  getPriceBlockHtmlFromStore,
  useBlock,
} from '@entities/quotation'
import {
  updatePriceValueCell,
  useUpdateTotalPriceIfPricesAboveWereChanged,
  validateTotalPrice,
} from '@features/blocks/cell/update-cell'
import type { FroalaEditor } from '@shared/type/froala'
import { type JSX, useRef } from 'react'

export const PriceValue = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  useUpdateTotalPriceIfPricesAboveWereChanged({
    blockIndex,
    editorRef,
  })

  return (
    <Froala
      editorRef={editorRef}
      htmlGetter={() => getPriceBlockHtmlFromStore({ blockIndex })}
      onBlur={() => {
        validateTotalPrice({ editorRef, blockIndex })
      }}
      onContentChange={() => {
        updatePriceValueCell({ editorRef, blockIndex })
      }}
      onInitialized={() => {
        validateTotalPrice({ editorRef, blockIndex })
      }}
      placeholder='Total price...'
    />
  )
}
