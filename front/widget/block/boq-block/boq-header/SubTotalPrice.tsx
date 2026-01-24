import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { subTotalPriceCellStyle } from '@entity/quotation/style/subTotalPriceCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import { showHidePricePins } from '@feature/blocks/pin'
import {
  formatSubtotalPrice,
  updateSubtotalPrice,
  useUpdateSubtotal,
  validatePrices,
} from '@feature/blocks/update'
import { type JSX, type MouseEvent, useRef } from 'react'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'

const boqHeaderKey: HeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): JSX.Element => {
  const boq = useBoq()
  const block = useBlock()

  const hidePinsClickHandlerRef = useRef<(e: globalThis.MouseEvent) => void>(
    (event) => {
      console.warn('hidePinsClickHandlerRef')
    },
  )

  const isInitClickRef = useRef(true)

  useUpdateSubtotal()

  return (
    /*
    <Froala
      editorRef={boq.subTotalPriceEditorRef}
      htmlGetter={() =>
        getBoqHeaderHtmlFromStore({ blockIndex: block.index, boqHeaderKey })
      }
      onBlur={() => {
        formatSubtotalPrice({
          blockIndex: block.index,
          subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
        })

        validatePrices({
          blockIndex: block.index,
          rowEditorRefs: boq.rowEditorRefs,
          subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
        })
      }}
      onClick={(event: MouseEvent) => {
        showHidePricePins({
          blockIndex: block.index,
          event: event.nativeEvent,
          hidePinsClickHandlerRef,
          isInitClickRef,
        })
      }}
      onContentChange={() => {
        updateSubtotalPrice({
          blockIndex: block.index,
          rowEditorRefs: boq.rowEditorRefs,
          subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
        })
      }}
      placeholder='Price...'
      style={subTotalPriceCellStyle}
    />
    */
    <Tiptap
      editorRef={boq.subTotalPriceEditorRef}
      content={getBoqHeaderHtmlFromStore({
        blockIndex: block.index,
        boqHeaderKey,
      })}
      onContentChange={(params) => {
        updateSubtotalPrice({
          blockIndex: block.index,
          rowEditorRefs: boq.rowEditorRefs,
          subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
        })
      }}
    />
  )
}
