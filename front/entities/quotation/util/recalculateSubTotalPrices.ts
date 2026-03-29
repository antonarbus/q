import { updateSubTotalPriceWithValue } from '@front/entities/quotation/util/updateSubTotalPriceWithValue'
import { reduxHolder } from '@front/shared/lib/redux'
import { editorRegistry, getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { roundTo } from 'round-to'

type Props = {
  incrementally: boolean
}

export const recalculateSubTotalPrices = (props: Props): void => {
  const state = reduxHolder.getState()

  state.quotation.blocks.forEach((block, blockIndex) => {
    if (block.type !== 'boq') {
      return
    }

    const subTotalPriceValue = roundTo(
      block.boq.rows.reduce((accumulator, row) => accumulator + row.price.value, 0),
      2,
    )

    updateSubTotalPriceWithValue({
      blockIndex,
      subTotalPriceEditor:
        editorRegistry.get(
          getRegistryKey({
            editorName: 'boqBlockSubTotalPrice',
            blockIndex,
            rowIndex: null,
          }),
        ) ?? null,
      value: subTotalPriceValue,
      incrementally: props.incrementally,
    })
  })
}
