import type { RowBlock } from '@back/entity/quotation/schema'
import { getBoqBlockFromStoreByIndex } from './getBoqBlockFromStoreByIndex'

type Props = {
  blockIndex: number
}

export const getRowsFromStoreByIndex = (props: Props): RowBlock[] | undefined => {
  const boqBlock = getBoqBlockFromStoreByIndex({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return undefined
  }

  return boqBlock.boq.rows
}
