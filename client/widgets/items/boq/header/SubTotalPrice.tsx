import { useRef } from 'react'
import { showHideBoqPricePins } from '@features/pin'
import { formatSubtotalPriceCell, updateSubtotalPriceCell, validateBoqRowPrices } from '@features/update_cell'
import { getBoqHeaderHtmlFromStore, useBoqItem, useItem, Froala, subTotalPriceCellStyle } from '@entities/items'
import { type BoqHeaderKey } from '@entities/items'

const boqHeaderKey: BoqHeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): JSX.Element => {
  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoqItem()
  const { itemIndex } = useItem()

  const hidePinsClickHandlerRef = useRef<(e: MouseEvent) => void>((e) => {})
  const isInitClickRef = useRef(true)

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
      additionalStyle={subTotalPriceCellStyle}
    />
  )
}
