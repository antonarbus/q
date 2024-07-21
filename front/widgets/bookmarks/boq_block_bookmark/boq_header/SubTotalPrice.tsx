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
  useBoqBlock,
  useBlock,
  Froala,
  subTotalPriceCellStyle,
  type BoqHeaderKey,
} from '@entities/quotation'

const boqHeaderKey: BoqHeaderKey = 'subTotalPrice'

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
      htmlGetter={() => getBoqHeaderHtmlFromStore({ blockIndex, boqHeaderKey })}
      onClick={(e) => {
        showHideBoqPricePins({
          e: e.nativeEvent,
          blockIndex,
          hidePinsClickHandlerRef,
          isInitClickRef,
        })
      }}
      onContentChange={() => {
        updateSubtotalPriceCell({
          subTotalPriceEditorRef,
          boqRowEditorRefs,
          blockIndex,
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
      style={subTotalPriceCellStyle}
    />
  )
}
