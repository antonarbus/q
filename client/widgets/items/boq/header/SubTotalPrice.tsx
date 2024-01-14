import { getBoqHeaderHtmlFromStore, useBoqItem, useItem, Froala, updateBoqHeaderCellAtStore, didBoqCellContentChange, didBoqHeaderCellContentChange, getBoqRowsFromStore, getBoqHeaderFromStore, subTotalPriceCellStyle, isBoqRowPriceValid, getBoqRowFromStore } from 'client/entities/items'
import { showHideBoqPricePins } from 'client/features/pin'
import { type BoqRow, type BoqHeaderKey } from 'client/shared/types'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { roundTo } from 'round-to'
import { updateBoqRowCellWithValue, updateSubTotalPriceWithValue } from 'client/features/update_cell'
import { notify } from 'client/shared/ui/top_msg'

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
      showHideBoqPricePins({
        e,
        itemIndex,
        hidePinsClickHandlerRef,
        isInitClickRef,
      })
    }}
      onContentChange={() => {
        if (subTotalPriceEditorRef.current === null) return

        const didContentChange = didBoqHeaderCellContentChange({
          editor: subTotalPriceEditorRef.current,
          itemIndex,
          boqHeaderKey,
        })

        if (!didContentChange) return

        const boqRows = getBoqRowsFromStore({ itemIndex })
        if (boqRows === undefined) return

        updateBoqHeaderCellAtStore({
          html: subTotalPriceEditorRef.current?.html.get() ?? '',
          itemIndex,
          boqHeaderKey,
        })

        const prevSubTotalPriceValue = boqRows.reduce((accumulator, boqRow) => {
          return accumulator + boqRow.price.value
        }, 0)

        const pinnedPricesSum = boqRows.reduce((accumulator, boqRow) => {
          if (boqRow.price.pin.isPinned) {
            return accumulator + boqRow.price.value
          }

          return accumulator
        }, 0)

        const subTotalPriceFromStore = getBoqHeaderFromStore({ itemIndex, boqHeaderKey })
        if (subTotalPriceFromStore === undefined) return
        const newSubTotalPriceValue = subTotalPriceFromStore.value

        const unpinnedPricesSumTarget = newSubTotalPriceValue - pinnedPricesSum
        const unpinnedPricesSum = prevSubTotalPriceValue - pinnedPricesSum

        if (unpinnedPricesSum === 0) {
          notify({
            msg: 'Unpinned prices give 0. Do not know how to adjust individual prices.',
            type: 'info',
          })

          updateSubTotalPriceWithValue({
            itemIndex,
            subTotalPriceEditor: subTotalPriceEditorRef.current,
            value: prevSubTotalPriceValue,
          })

          return
        }

        type Prices = Array<{
          oldValue: number
          isPinned: boolean
          newValue: number
          editor: FroalaEditor | null
        }>

        const prices: Prices = boqRows.map((boqRow, index) => {
          const oldValue = boqRow.price.value
          const isPinned = boqRow.price.pin.isPinned

          const newValue = oldValue * (unpinnedPricesSumTarget / unpinnedPricesSum)

          return {
            oldValue,
            isPinned,
            newValue: isPinned ? oldValue : roundTo(newValue, 2),
            editor: boqPriceEditorRefs.at(index)?.current ?? null,
          }
        })

        const areAllCellsPinned = prices.every(price => price.isPinned)

        if (areAllCellsPinned) {
          notify({
            msg: 'Can\'t be changed. All row prices are pinned.',
            type: 'info',
          })

          updateSubTotalPriceWithValue({
            itemIndex,
            subTotalPriceEditor: subTotalPriceEditorRef.current,
            value: prevSubTotalPriceValue,
          })

          return
        }

        prices.forEach((price, index) => {
          updateBoqRowCellWithValue({
            boqColumnKey: 'price',
            editor: price.editor,
            itemIndex,
            rowIndex: index,
            value: price.newValue,
          })
        })
      }}
      onBlur={() => {
        const boqRows = getBoqRowsFromStore({ itemIndex })
        if (boqRows === undefined) return

        boqRows.forEach((boqRow, rowIndex) => {
          const priceCellEditorRef = boqPriceEditorRefs.at(rowIndex)
          if (priceCellEditorRef === undefined) return
          if (priceCellEditorRef === null) return
          if (priceCellEditorRef.current === null) return

          const isPriceValid = isBoqRowPriceValid({
            html: priceCellEditorRef.current.html.get(),
            itemIndex,
            rowIndex,
          })

          if (!isPriceValid) {
            notify({
              msg: 'Individual prices can not give desired subtotal value. Setting the closest value.',
              type: 'info',
            })

            const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
            const newPriceValueRounded = roundTo(newPriceValue, 2)

            updateBoqRowCellWithValue({
              boqColumnKey: 'price',
              editor: priceCellEditorRef.current,
              itemIndex,
              rowIndex,
              value: newPriceValueRounded,
            })

            const boqRows = getBoqRowsFromStore({ itemIndex })
            if (boqRows === undefined) return

            const subTotalPriceValueNew: number = boqRows.reduce((accumulator: number, boqRow: BoqRow) => {
              const price = boqRow.price.value
              return accumulator + price
            }, 0)

            const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

            updateSubTotalPriceWithValue({
              itemIndex,
              subTotalPriceEditor: subTotalPriceEditorRef.current,
              value: subTotalPriceValueNewRounded,
            })
          }
        })
      }}
      additionalStyle={subTotalPriceCellStyle}
    />
  )
}
