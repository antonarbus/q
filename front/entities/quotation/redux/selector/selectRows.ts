import type { RootState } from '@shared/lib/redux'
import type { RowBlock } from '@back/entities/quotation/schema'
import { getRowsFromStore } from '../getter/getRowsFromStore'

type Props = {
  blockIndex: number
}

export const selectRows =
  ({ blockIndex }: Props) =>
  (_state: RootState): RowBlock[] => {
    const rows = getRowsFromStore({ blockIndex })

    if (rows === undefined) {
      return []
    }

    return rows
  }
