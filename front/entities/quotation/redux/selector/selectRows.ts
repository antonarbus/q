import type { RootState } from '@shared/lib/redux'
import type { Row } from '../../type'
import { getRowsFromStore } from '../getter/getRowsFromStore'

type Props = {
  blockIndex: number
}

export const selectRows =
  ({ blockIndex }: Props) =>
  (_state: RootState): Row[] => {
    const rows = getRowsFromStore({ blockIndex })

    if (rows === undefined) {
      return []
    }

    return rows
  }
