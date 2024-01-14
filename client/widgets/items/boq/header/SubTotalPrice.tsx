import { getBoqHeaderHtmlFromStore, useBoqItem, useItem, Froala, updateBoqHeaderCellAtStore, didBoqCellContentChange, didBoqHeaderCellContentChange, getBoqRowsFromStore, getBoqHeaderFromStore } from 'client/entities/items'
import { showHideBoqPricePins } from 'client/features/pin'
import { type BoqHeaderKey } from 'client/shared/types'
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
            msg: 'All row prices are pinned',
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

          console.log(prices)

          // todo: at this point we need to modify itemPrice or qty
          // todo: and for that we need froalas
        })
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onBlur={(e: any) => {
      }}
      additionalStyle={{
        width: '100%',
        minWidth: '100px',
        whiteSpace: 'nowrap',
        textAlign: 'right',
        flexShrink: 0,
        right: 0,
        minHeight: '24px',
      }}
    />
  )
}
