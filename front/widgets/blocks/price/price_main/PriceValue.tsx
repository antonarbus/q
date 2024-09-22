import { useRef } from 'react'
import {
  updatePriceValueCell,
  useUpdateTotalPriceIfPricesAboveWereChanged,
  validateTotalPrice,
} from '@features/blocks/cell/update_cell'
import {
  useBlock,
  Froala,
  getPriceBlockHtmlFromStore,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/types/froala'

export const PriceValue = (): React.JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()
  useUpdateTotalPriceIfPricesAboveWereChanged({
    blockIndex,
    editorRef,
  })

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Total price...'
      htmlGetter={() => getPriceBlockHtmlFromStore({ blockIndex })}
      onContentChange={() => {
        updatePriceValueCell({ editorRef, blockIndex })
      }}
      onBlur={() => {
        validateTotalPrice({ editorRef, blockIndex })
      }}
      onInitialized={() => {
        validateTotalPrice({ editorRef, blockIndex })
      }}
    />
  )
}
