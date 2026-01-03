import { getState } from '@shared/lib/redux'
import type {
  BlockItem,
  Quotation,
} from '@back/entities/quotation/quotationSchema'

type Props = {
  id: string
}

export const getFromStore = (
  props: Props,
): BlockItem | Quotation | undefined => {
  const state = getState()

  if (state.quotation.id === props.id) {
    return state.quotation
  }

  const blockWithSameId = state.quotation.blocks.find((block) => {
    return block.id === props.id
  })

  if (blockWithSameId !== undefined) {
    return blockWithSameId
  }

  for (const block of state.quotation.blocks) {
    if (block.type === 'boq') {
      for (const row of block.boq.rows) {
        if (row.id === props.id) {
          return row
        }
      }
    }
  }

  return undefined
}
