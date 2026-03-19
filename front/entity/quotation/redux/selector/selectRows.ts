import type { RootState } from '@shared/lib/redux'
import type { RowBlock } from '@back/entity/quotation/schema'
import { getRowsFromStoreByIndex } from '../getter/getRowsFromStoreByIndex'

type Props = {
  blockIndex: number
}

export const selectRows =
  ({ blockIndex }: Props) =>
  (_state: RootState): RowBlock[] => {
    const rows = getRowsFromStoreByIndex({ blockIndex })

    if (rows === undefined) {
      return []
    }

    return rows
  }
