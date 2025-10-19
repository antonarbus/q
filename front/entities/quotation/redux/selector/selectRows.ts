import type { RootState } from '@shared/lib/redux'
import type { Row } from '../../type'
import { getRowsFromStore } from '../getter/getRowsFromStore'

type Props = {
  blockIndex: number
}

export const selectRows =
  ({ blockIndex }: Props) =>
  (_state: RootState): Row[] => {
    const boqRows = getRowsFromStore({ blockIndex })

    if (boqRows === undefined) {
      return []
    }

    return boqRows
  }
