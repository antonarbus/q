import type { BlockItem } from '@root/shared/types/BlockItem'
import type { Quotation } from '@root/shared/types/Quotation'

type Props = {
  id: string
  state: Quotation
}

export const getFromState = (props: Props): BlockItem | undefined => {
  const blockWithSameId = props.state.blocks.find((block) => {
    return block.id === props.id
  })

  if (blockWithSameId !== undefined) {
    return blockWithSameId
  }

  for (const block of props.state.blocks) {
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
