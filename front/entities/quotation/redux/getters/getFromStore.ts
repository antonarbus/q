import { getState } from '@shared/lib/redux'
import type { Item, Quotation } from '../../types'

type Props = {
  id: string
}

export const getFromStore = ({ id }: Props): Item | Quotation | undefined => {
  const quotation = getState().quotation

  if (quotation.id === id) {
    return quotation
  }

  const blockWithSameId = quotation.blocks.find((block) => {
    return block.id === id
  })

  if (blockWithSameId !== undefined) {
    return blockWithSameId
  }

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
