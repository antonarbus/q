import type { RowBlock } from '@back/entity/quotation/schema'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import { roundTo } from 'round-to'
import type { Editor } from '@tiptap/react'

type Props = {
  blockIndex: number
  subTotalPriceEditor: Editor | null
}

export const updateSubTotalPrice = (props: Props): void => {
  const rows = getRowsFromStore({ blockIndex: props.blockIndex })

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
    blockIndex: props.blockIndex,
    subTotalPriceEditor: props.subTotalPriceEditor,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })
}
