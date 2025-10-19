import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useBoq } from '@entities/quotation/provider/BoqBlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entities/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { subTotalPriceCellStyle } from '@entities/quotation/style/subTotalPriceCellStyle'
import type { HeaderKey } from '@entities/quotation/type'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { showHideBoqPricePins } from '@features/blocks/cell/pin'
import {
  formatSubtotalPriceCell,
  updateSubtotalPriceCell,
  useUpdateSubtotalPrice,
  validateBoqRowPrices,
} from '@features/blocks/cell/update-cell'
import { type JSX, type MouseEvent, useRef } from 'react'

const boqHeaderKey: HeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): JSX.Element => {
  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoq()
  const block = useBlock()

  const hidePinsClickHandlerRef = useRef<(e: globalThis.MouseEvent) => void>(
    (event) => {
      console.warn('hidePinsClickHandlerRef')
    },
  )

  const isInitClickRef = useRef(true)

  useUpdateSubtotalPrice()

  return (
    <Froala
      editorRef={subTotalPriceEditorRef}
      htmlGetter={() =>
        getBoqHeaderHtmlFromStore({ blockIndex: block.index, boqHeaderKey })
      }
      onBlur={() => {
        formatSubtotalPriceCell({
          blockIndex: block.index,
          subTotalPriceEditorRef,
        })

        validateBoqRowPrices({
          blockIndex: block.index,
          boqRowEditorRefs,
          subTotalPriceEditorRef,
        })
      }}
      onClick={(event: MouseEvent) => {
        showHideBoqPricePins({
          blockIndex: block.index,
          event: event.nativeEvent,
          hidePinsClickHandlerRef,
          isInitClickRef,
        })
      }}
      onContentChange={() => {
        updateSubtotalPriceCell({
          blockIndex: block.index,
          boqRowEditorRefs,
          subTotalPriceEditorRef,
        })
      }}
      placeholder='Price...'
      style={subTotalPriceCellStyle}
    />
  )
}
