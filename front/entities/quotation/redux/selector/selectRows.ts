import type { RootState } from '@front/shared/lib/redux/reduxHolder'
import type { RowBlock } from '@back/entity/quotation/schema'
import { getRowsFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowsFromStoreByIndex'

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
