import { getState } from '@lib_instances/store'
import { type Item, type BlockBoq } from '../../types'

type Props = {
  id: string
}

export const getItemByIdFromStore = ({ id }: Props): Item | undefined => {
  const quotation = getState().quotation

  const block = quotation.items.find((item) => {
    return item.id === id
  })

  if (block) return block

  for (const block of quotation.items) {
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
