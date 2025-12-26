import type { BlockItem } from '../../types/BlockItem'
import type { Quotation } from '../../types/Quotation'

type Props = {
  id: string
  state: Quotation
}

export const getFromState = ({ id, state }: Props): BlockItem | undefined => {
  const blockWithSameId = state.blocks.find((block) => {
    return block.id === id
  })

  if (blockWithSameId !== undefined) {
    return blockWithSameId
  }

  for (const block of state.blocks) {
    if (block.type === 'boq') {
      for (const row of block.boq.rows) {
        if (row.id === id) {
          return row
        }
      }
    }
  }

  return undefined
}
