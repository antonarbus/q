import { useRef } from 'react'
import { showHideBoqPricePins } from '@features/blocks/cell/pin'
import {
  formatSubtotalPriceCell,
  updateSubtotalPriceCell,
  useUpdateSubtotalPrice,
  validateBoqRowPrices,
} from '@features/blocks/cell/update_cell'
import {
  getBoqHeaderHtmlFromStore,
  useBoq,
  useBlock,
  Froala,
  subTotalPriceCellStyle,
  type HeaderKey,
} from '@entities/quotation'

const boqHeaderKey: HeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): React.JSX.Element => {
  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoq()
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
      htmlGetter={() => getBoqHeaderHtmlFromStore({ blockIndex, boqHeaderKey })}
      onClick={(e: React.MouseEvent) => {
        showHideBoqPricePins({
          blockIndex,
          e: e.nativeEvent,
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
      onBlur={() => {
        formatSubtotalPriceCell({ blockIndex, subTotalPriceEditorRef })

        validateBoqRowPrices({
          blockIndex,
          boqRowEditorRefs,
          subTotalPriceEditorRef,
        })
      }}
      style={subTotalPriceCellStyle}
    />
  )
}
