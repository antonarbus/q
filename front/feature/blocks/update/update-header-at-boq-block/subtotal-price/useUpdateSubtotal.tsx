import type { RowBlock } from '@back/entity/quotation/schema'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import { useSelector } from '@shared/lib/redux'
import { useUpdateEffect } from 'react-use'
import { roundTo } from 'round-to'

// todo: try to make subtotal calculation imperative in features
export const useUpdateSubtotal = (): void => {
  const block = useBlock()
  const boq = useBoq()

  const subtotalTrigger = useSelector((state) => state.text.subtotalTrigger)

  const recalculate = (): void => {
    const rows = getRowsFromStore({ blockIndex: block.index })

    if (rows === undefined) {
      return
    }

    const subTotalPriceValueNew: number = rows.reduce(
      (accumulator: number, row: RowBlock) => {
        const price = row.price.value

        return accumulator + price
      },
      0,
    )

    const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

    updateSubTotalPriceWithValue({
      blockIndex: block.index,
      subTotalPriceEditor: boq.subTotalPriceEditorRef.current,
      value: subTotalPriceValueNewRounded,
      incrementally: true,
    })
  }

  useUpdateEffect(() => {
    recalculate()
  }, [subtotalTrigger])
}
