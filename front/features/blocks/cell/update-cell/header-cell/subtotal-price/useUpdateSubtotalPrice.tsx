import {
  getBoqRowsFromStore,
  type Row,
  updateSubTotalPriceWithValue,
  useBlock,
  useBoq,
} from '@entities/quotation'
import { useSelector } from '@shared/lib/redux'
import { useUpdateEffect } from 'react-use'
import { roundTo } from 'round-to'

export const useUpdateSubtotalPrice = (): void => {
  const { blockIndex } = useBlock()
  const { subTotalPriceEditorRef } = useBoq()

  const isBlockFroala = useSelector(
    (state) => state.quotation.blocks[blockIndex]?.isFroala,
  )

  const isEditable = useSelector((state) => state.text.isEditable)

  useUpdateEffect(() => {
    if (isEditable === false) {
      return
    }

    if (isBlockFroala === undefined) {
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
  }, [isBlockFroala, isEditable])
}
