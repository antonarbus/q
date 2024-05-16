import { useRef } from 'react'
import { showHideBoqPricePins } from '@features/items/cell/pin'
import { formatSubtotalPriceCell, updateSubtotalPriceCell, useUpdateSubtotalPrice, validateBoqRowPrices } from '@features/items/cell/update_cell'
import { getBoqHeaderHtmlFromStore, useBoqItem, useItem, Froala, subTotalPriceCellStyle, type BoqHeaderKey } from '@entities/quotation'

const boqHeaderKey: BoqHeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): JSX.Element => {
  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoqItem()
  const { itemIndex } = useItem()
  const hidePinsClickHandlerRef = useRef<(e: MouseEvent) => void>((e) => {})
  const isInitClickRef = useRef(true)
  useUpdateSubtotalPrice()

  return (
    <Froala
      editorRef={subTotalPriceEditorRef}
      placeholder='Price...'
      htmlGetter={() => getBoqHeaderHtmlFromStore({ itemIndex, boqHeaderKey })}
      onClick={(e) => {
        showHideBoqPricePins({ e: e.nativeEvent, itemIndex, hidePinsClickHandlerRef, isInitClickRef })
      }}
      onContentChange={() => {
        updateSubtotalPriceCell({ subTotalPriceEditorRef, boqRowEditorRefs, itemIndex })
      }}
      onBlur={() => {
        formatSubtotalPriceCell({ itemIndex, subTotalPriceEditorRef })
        validateBoqRowPrices({ boqRowEditorRefs, itemIndex, subTotalPriceEditorRef })
      }}
      style={subTotalPriceCellStyle}
    />
  )
}
