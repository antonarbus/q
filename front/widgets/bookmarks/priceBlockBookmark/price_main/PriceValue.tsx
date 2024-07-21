import { useRef } from 'react'
import {
  updatePriceValueCell,
  useUpdateTotalPriceIfPricesAboveWereChanged,
} from '@features/blocks/cell/update_cell'
import { useBlock, Froala, itemType } from '@entities/quotation'
import { type FroalaEditor } from '@shared/types/froala'
import { bookmarkSignal } from '@entities/bookmark'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'

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
      placeholder='Total price...'
      htmlGetter={() => {
        if (bookmarkSignal.value?.type !== itemType.price) return ''
        const html = bookmarkSignal.value.price.html
        return html
      }}
      onContentChange={() => {
        updatePriceValueCell({ editorRef, blockIndex })

        if (editorRef.current === null) return
        if (bookmarkSignal.value?.type !== itemType.price) return
        const html = editorRef.current.html.get()

        const cellTextContent = getTextContentFromHtml({ html })
        const valueFromHtml = getNumberFromString({
          string: cellTextContent,
        })

        const newBookmarkValue = structuredClone(bookmarkSignal.value)
        newBookmarkValue.price.html = html
        newBookmarkValue.price.value = valueFromHtml

        bookmarkSignal.value = newBookmarkValue
      }}
    />
  )
}
