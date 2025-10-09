import {
  Froala,
  getBoqHeaderHtmlFromStore,
  type HeaderKey,
  subTotalPriceCellStyle,
  useBlock,
  useBoq,
} from '@entities/quotation'
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
  const { blockIndex } = useBlock()

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
      htmlGetter={() => getBoqHeaderHtmlFromStore({ blockIndex, boqHeaderKey })}
      onBlur={() => {
        formatSubtotalPriceCell({ blockIndex, subTotalPriceEditorRef })

        validateBoqRowPrices({
          blockIndex,
          boqRowEditorRefs,
          subTotalPriceEditorRef,
        })
      }}
      onClick={(event: MouseEvent) => {
        showHideBoqPricePins({
          blockIndex,
          event: event.nativeEvent,
          hidePinsClickHandlerRef,
          isInitClickRef,
        })
      }}
      onContentChange={() => {
        updateSubtotalPriceCell({
          blockIndex,
          boqRowEditorRefs,
          subTotalPriceEditorRef,
        })
      }}
      placeholder='Price...'
      style={subTotalPriceCellStyle}
    />
  )
}
