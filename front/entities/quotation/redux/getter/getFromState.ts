import type { BlockItem, Quotation } from '@back/entity/quotation/schema'

type Props = {
  id: string
  state: Quotation
}

export const getFromState = (
  props: Props,
): Quotation | BlockItem | undefined => {
  const quotationWithSameId = props.state.id === props.id

  if (quotationWithSameId === true) {
    return props.state
  }

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
