import { getState } from '@lib_instances/store'
import { type Item } from '../../types'

type Props = {
  id: string
}

export const getItemByIdFromStore = ({ id }: Props): Item | undefined => {
  const quotation = getState().quotation

  const blockWithSameId = quotation.blocks.find((block) => {
    return block.id === id
  })

  if (blockWithSameId) return blockWithSameId

  for (const block of quotation.blocks) {
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
