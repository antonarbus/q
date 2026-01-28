import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import type { RowBlock } from '@back/entity/quotation/schema'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import { useSelector } from '@shared/lib/redux'
import { useUpdateEffect } from 'react-use'
import { roundTo } from 'round-to'

export const useUpdateSubtotal = (): void => {
  const block = useBlock()
  const boq = useBoq()

  const isEditable = useSelector((state) => state.text.isEditable)

  useUpdateEffect(() => {
    if (isEditable === false) {
      return
    }

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
  }, [isEditable])
}
