import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useBoq } from '@entities/quotation/provider/BoqBlockProvider'
import { getRowsFromStore } from '@entities/quotation/redux/getter/getRowsFromStore'
import type { Row } from '@entities/quotation/types/BlockItem'
import { updateSubTotalPriceWithValue } from '@entities/quotation/util/updateSubTotalPriceWithValue'
import { useSelector } from '@shared/lib/redux'
import { useUpdateEffect } from 'react-use'
import { roundTo } from 'round-to'

export const useUpdateSubtotal = (): void => {
  const block = useBlock()
  const boq = useBoq()

  const isBlockFroala = useSelector(
    (state) => state.quotation.blocks[block.index]?.isFroala,
  )

  const isEditable = useSelector((state) => state.text.isEditable)

  useUpdateEffect(() => {
    if (isEditable === false) {
      return
    }

    if (isBlockFroala === undefined) {
      return
    }

    const rows = getRowsFromStore({ blockIndex: block.index })

    if (rows === undefined) {
      return
    }

    const subTotalPriceValueNew: number = rows.reduce(
      (accumulator: number, row: Row) => {
        const price = row.price.value

        return accumulator + price
      },
      0,
    )

    const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

    setTimeout(() => {
      updateSubTotalPriceWithValue({
        blockIndex: block.index,
        subTotalPriceEditor: boq.subTotalPriceEditorRef.current,
        value: subTotalPriceValueNewRounded,
        incrementally: true,
      })
    }, 100) // froala needs time to initialize, better if we update some state in Froala, but do not see elegant way
  }, [isBlockFroala, isEditable])
}
