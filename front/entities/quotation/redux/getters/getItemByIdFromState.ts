import { type Quotation, type Item, type BoqBlock } from '../../types'

type Props = {
  id: string
  state: Quotation
}

export const getItemByIdFromState = ({
  id,
  state,
}: Props): Item | undefined => {
  const block = state.items.find((item) => {
    return item.id === id
  })

  if (block) return block

  for (const block of state.items) {
    if (block?.type === 'boq') {
      for (const boqRow of block.boq.rows) {
        if (boqRow.id === id) {
          return boqRow
        }
      }
    }
  }

  return undefined
}
