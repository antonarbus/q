import type { Quotation, Item } from '../../types'

type Props = {
  id: string
  state: Quotation
}

export const getItemFromState = ({ id, state }: Props): Item | undefined => {
  const blockWithSameId = state.blocks.find((block) => {
    return block.id === id
  })

  if (blockWithSameId) return blockWithSameId

  for (const block of state.blocks) {
    if (block.type === 'boq') {
      for (const boqRow of block.boq.rows) {
        if (boqRow.id === id) {
          return boqRow
        }
      }
    }
  }

  return undefined
}
