import { useRef } from 'react'
import { updatePriceValueCell, useUpdateTotalPriceIfPricesAboveWereChanged, validateTotalPrice } from '@features/update_cell'
import { useItem, Froala, getTotalPriceHtmlFromStore } from '@entities/items'
import { type FroalaEditor } from '@shared/types'

export const PriceValue = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()
  useUpdateTotalPriceIfPricesAboveWereChanged({ itemIndex, editorRef })

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Total price...'
      htmlGetter={() => getTotalPriceHtmlFromStore({ itemIndex })}
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
