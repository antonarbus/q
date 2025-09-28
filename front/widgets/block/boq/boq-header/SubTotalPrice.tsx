import { type JSX, type MouseEvent, useRef } from 'react'
import { showHideBoqPricePins } from '@features/blocks/cell/pin'
import {
  formatSubtotalPriceCell,
  updateSubtotalPriceCell,
  useUpdateSubtotalPrice,
  validateBoqRowPrices,
} from '@features/blocks/cell/update-cell'
import {
  getBoqHeaderHtmlFromStore,
  useBoq,
  useBlock,
  Froala,
  subTotalPriceCellStyle,
  type HeaderKey,
} from '@entities/quotation'

const boqHeaderKey: HeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): JSX.Element => {
  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoq()
  const { blockIndex } = useBlock()

  const hidePinsClickHandlerRef = useRef<(e: MouseEvent<Element>) => void>(
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
