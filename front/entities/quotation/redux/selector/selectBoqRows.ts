import type { RootState } from '@shared/lib/redux'
import type { Row } from '../../type'
import { getBoqRowsFromStore } from '../getter/getBoqRowsFromStore'

type Props = {
  blockIndex: number
}

export const selectBoqRows =
  ({ blockIndex }: Props) =>
  (_state: RootState): Row[] => {
    const boqRows = getBoqRowsFromStore({ blockIndex })

    if (boqRows === undefined) {
      return []
    }

    return boqRows
  }
