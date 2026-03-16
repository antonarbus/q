import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import type { RowBlock } from '@back/entity/quotation/schema'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import { useUpdateEffect } from 'react-use'
import { roundTo } from 'round-to'
import { useSelector } from '@shared/lib/redux'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'
import { blockEditorKey } from '@shared/lib/tiptap/editorKey'

export const useUpdateSubtotalPriceValue = (): void => {
  const block = useBlock()

  const rowsQty = useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'boq') {
      return thisBlock.boq.rows.length
    }

    return 0
  })

  useUpdateEffect(() => {
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
      subTotalPriceEditor:
        editorRegistry.get(
          blockEditorKey({
            blockIndex: block.index,
            editorName: 'subTotalPrice',
          }),
        ) ?? null,
      value: subTotalPriceValueNewRounded,
      incrementally: true,
    })
  }, [rowsQty])
}
