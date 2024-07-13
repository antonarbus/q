import { useSelectorTyped } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import { roundTo } from 'round-to'
import {
  useBoqItem,
  useItem,
  getBoqRowsFromStore,
  type BoqRow,
  updateSubTotalPriceWithValue,
  isFroalaSignal,
} from '@entities/quotation'

export const useUpdateSubtotalPrice = (): void => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const isBlockFroala = useSelectorTyped(
    (state) => state.quotation.blocks[itemIndex]?.isFroala,
  )

  useUpdateEffect(() => {
    if (!isFroalaSignal.value) return
    if (!isBlockFroala) return

    const boqRows = getBoqRowsFromStore({ itemIndex })

    if (boqRows === undefined) return

    const subTotalPriceValueNew: number = boqRows.reduce(
      (accumulator: number, boqRow: BoqRow) => {
        const price = boqRow.price.value
        return accumulator + price
      },
      0,
    )

    const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

    setTimeout(() => {
      updateSubTotalPriceWithValue({
        itemIndex,
        subTotalPriceEditor: subTotalPriceEditorRef.current,
        value: subTotalPriceValueNewRounded,
        incrementally: true,
      })
    })
  }, [isBlockFroala, isFroalaSignal.value])
}
