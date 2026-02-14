import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { subTotalPriceCellStyle } from '@entity/quotation/style/subTotalPriceCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { showHidePricePins } from '@feature/blocks/pin'
import {
  formatSubtotalPrice,
  updateSubtotalPrice,
  useUpdateSubtotal,
  validatePrices,
} from '@feature/blocks/update'
import { useRef, type JSX, type MouseEvent } from 'react'
import { TextEditor } from '@shared/component/TextEditor'

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
    <TextEditor
      editorRef={boq.subTotalPriceEditorRef}
      className='sub-total-price'
      placeholder='Price...'
      content={getBoqHeaderHtmlFromStore({
        blockIndex: block.index,
        boqHeaderKey,
      })}
      onUpdate={(params) => {
        updateSubtotalPrice({
          blockIndex: block.index,
          rowEditorRefs: boq.rowEditorRefs,
          subTotalPriceEditorRef: boq.subTotalPriceEditorRef,
        })
      }}
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
      onWrapperClick={(event: MouseEvent) => {
        showHidePricePins({
          blockIndex: block.index,
          event: event.nativeEvent,
          hidePinsClickHandlerRef,
          isInitClickRef,
        })
      }}
      sx={subTotalPriceCellStyle}
    />
  )
}
