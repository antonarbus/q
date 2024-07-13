import { useRef } from 'react'
import {
  updatePriceValueCell,
  useUpdateTotalPriceIfPricesAboveWereChanged,
  validateTotalPrice,
} from '@features/items/cell/update_cell'
import {
  useItem,
  Froala,
  getPriceBlockHtmlFromStore,
} from '@entities/quotation'
import { type FroalaEditor } from '@shared/types/froala'

export const PriceValue = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()
  useUpdateTotalPriceIfPricesAboveWereChanged({ itemIndex, editorRef })

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Total price...'
      htmlGetter={() => getPriceBlockHtmlFromStore({ itemIndex })}
      onContentChange={() => {
        updatePriceValueCell({ editorRef, itemIndex })
      }}
      onBlur={() => {
        validateTotalPrice({ editorRef, itemIndex })
      }}
      onInitialized={() => {
        validateTotalPrice({ editorRef, itemIndex })
      }}
    />
  )
}
