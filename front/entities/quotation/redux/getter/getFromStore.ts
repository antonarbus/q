import { getState } from '@shared/lib/redux'
import type { BlockItem } from '../../types/BlockItem'
import type { Quotation } from '../../types/Quotation'

type Props = {
  id: string
}

export const getFromStore = ({
  id,
}: Props): BlockItem | Quotation | undefined => {
  const { quotation } = getState()

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
      for (const row of block.boq.rows) {
        if (row.id === id) {
          return row
        }
      }
    }
  }

  return undefined
}
