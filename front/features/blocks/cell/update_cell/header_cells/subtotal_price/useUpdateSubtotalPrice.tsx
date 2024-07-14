import { useSelectorTyped } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import { roundTo } from 'round-to'
import {
  useBoqBlock,
  useBlock,
  getBoqRowsFromStore,
  type BoqRow,
  updateSubTotalPriceWithValue,
  isFroalaSignal,
} from '@entities/quotation'

export const useUpdateSubtotalPrice = (): void => {
  const { blockIndex } = useBlock()
  const { subTotalPriceEditorRef } = useBoqBlock()
  const isBlockFroala = useSelectorTyped(
    (state) => state.quotation.blocks[blockIndex]?.isFroala,
  )

  useUpdateEffect(() => {
    if (!isFroalaSignal.value) return
    if (!isBlockFroala) return

    const boqRows = getBoqRowsFromStore({ blockIndex })

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
        blockIndex,
        subTotalPriceEditor: subTotalPriceEditorRef.current,
        value: subTotalPriceValueNewRounded,
        incrementally: true,
      })
    })
  }, [isBlockFroala, isFroalaSignal.value])
}
