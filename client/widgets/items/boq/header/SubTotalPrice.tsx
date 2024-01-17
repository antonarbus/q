import { getBoqHeaderHtmlFromStore, useBoqItem, useItem, Froala, subTotalPriceCellStyle } from '@entities/items'
import { showHideBoqPricePins } from '@features/pin'
import { type BoqHeaderKey } from '@shared/types'
import { useRef } from 'react'
import { formatSubtotalPriceCell, updateSubtotalPriceCell, validateBoqRowPrices } from '@features/update_cell'

const boqHeaderKey: BoqHeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): JSX.Element => {
  const { subTotalPriceEditorRef, boqPriceEditorRefs } = useBoqItem()
  const { itemIndex } = useItem()

  const hidePinsClickHandlerRef = useRef<(e: MouseEvent) => void>((e) => {})
  const isInitClickRef = useRef(true)

  return (
    <Froala
      editorRef={subTotalPriceEditorRef}
      placeholder='Price...'
      htmlGetter={() => getBoqHeaderHtmlFromStore({ itemIndex, boqHeaderKey })}
      onClick={(e) => {
        showHideBoqPricePins({ e, itemIndex, hidePinsClickHandlerRef, isInitClickRef })
      }}
      onContentChange={() => {
        updateSubtotalPriceCell({ subTotalPriceEditorRef, boqPriceEditorRefs, itemIndex })
      }}
      onBlur={() => {
        formatSubtotalPriceCell({ itemIndex, subTotalPriceEditorRef })
        validateBoqRowPrices({ boqPriceEditorRefs, itemIndex, subTotalPriceEditorRef })
      }}
      additionalStyle={subTotalPriceCellStyle}
    />
  )
}
