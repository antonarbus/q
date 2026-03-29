import { reduxHolder } from '@front/shared/lib/redux'
import type { BlockItem, Quotation, RowBlock } from '@back/entity/quotation/schema'

type Props = {
  id: string
}

type Res =
  | {
      type: 'quotation'
      data: Quotation
    }
  | {
      type: 'block'
      data: BlockItem
      blockIndex: number
    }
  | {
      type: 'row'
      data: RowBlock
      blockIndex: number
      rowIndex: number
    }
  | undefined

export const getItemFromStoreById = (props: Props): Res => {
  const state = reduxHolder.getState()

  if (state.quotation.id === props.id) {
    return { type: 'quotation', data: state.quotation }
  }

  const blockWithSameId = state.quotation.blocks.find((block) => block.id === props.id)

  if (blockWithSameId !== undefined) {
    const blockIndex = state.quotation.blocks.indexOf(blockWithSameId)

    return { type: 'block', data: blockWithSameId, blockIndex }
  }

  for (const [blockIndex, boqBlock] of state.quotation.blocks.entries()) {
    if (boqBlock.type === 'boq') {
      for (const [rowIndex, row] of boqBlock.boq.rows.entries()) {
        if (row.id === props.id) {
          return { type: 'row', data: row, blockIndex, rowIndex }
        }
      }
    }
  }

  return undefined
}
