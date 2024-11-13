import { useSelector } from '@shared/lib/redux'
import { useUpdateEffect } from 'react-use'
import { roundTo } from 'round-to'
import {
  useBoq,
  useBlock,
  getBoqRowsFromStore,
  type Row,
  updateSubTotalPriceWithValue,
  isFroalaSignal,
} from '@entities/quotation'

export const useUpdateSubtotalPrice = (): void => {
  const { blockIndex } = useBlock()
  const { subTotalPriceEditorRef } = useBoq()

  const isBlockFroala = useSelector(
    (state) => state.quotation.blocks[blockIndex]?.isFroala,
  )

  useUpdateEffect(() => {
    if (!isFroalaSignal.value) {
      return
    }

    if (!isBlockFroala) {
      return
    }

    const boqRows = getBoqRowsFromStore({ blockIndex })

    if (boqRows === undefined) {
      return
    }

    const subTotalPriceValueNew: number = boqRows.reduce(
      (accumulator: number, boqRow: Row) => {
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
