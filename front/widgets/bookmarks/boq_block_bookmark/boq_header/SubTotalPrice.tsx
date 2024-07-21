import { useRef } from 'react'
import { showHideBoqPricePins } from '@features/blocks/cell/pin'
import {
  formatSubtotalPriceCell,
  updatePriceValueCell,
  useUpdateSubtotalPrice,
  validateBoqRowPrices,
} from '@features/blocks/cell/update_cell'
import {
  useBoqBlock,
  useBlock,
  Froala,
  subTotalPriceCellStyle,
  itemType,
} from '@entities/quotation'
import { bookmarkSignal } from '@entities/bookmark'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'

export const SubTotalPrice = (): JSX.Element => {
  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoqBlock()
  const { blockIndex } = useBlock()
  const hidePinsClickHandlerRef = useRef<(e: MouseEvent) => void>((e) => {
    console.warn('hidePinsClickHandlerRef')
  })
  const isInitClickRef = useRef(true)
  useUpdateSubtotalPrice()

  return (
    <Froala
      editorRef={subTotalPriceEditorRef}
      placeholder='Price...'
      style={subTotalPriceCellStyle}
      htmlGetter={() => {
        if (bookmarkSignal.value?.type !== itemType.boq) return ''
        const html = bookmarkSignal.value.boq.header.subTotalPrice.html
        return html
      }}
      onContentChange={() => {
        updatePriceValueCell({ editorRef: subTotalPriceEditorRef, blockIndex })

        if (subTotalPriceEditorRef.current === null) return
        if (bookmarkSignal.value?.type !== itemType.boq) return
        const html = subTotalPriceEditorRef.current.html.get()

        const cellTextContent = getTextContentFromHtml({ html })
        const valueFromHtml = getNumberFromString({
          string: cellTextContent,
        })

        const clonedBookmark = structuredClone(bookmarkSignal.value)
        clonedBookmark.boq.header.subTotalPrice.html = html
        clonedBookmark.boq.header.subTotalPrice.value = valueFromHtml

        bookmarkSignal.value = clonedBookmark
      }}
      onClick={(e) => {
        showHideBoqPricePins({
          e: e.nativeEvent,
          blockIndex,
          hidePinsClickHandlerRef,
          isInitClickRef,
        })
      }}
      onBlur={() => {
        formatSubtotalPriceCell({ blockIndex, subTotalPriceEditorRef })
        validateBoqRowPrices({
          boqRowEditorRefs,
          blockIndex,
          subTotalPriceEditorRef,
        })
      }}
    />
  )
}
