import type { RootState } from '@shared/lib/redux'
import type { Row } from '../../types'
import { getBoqRowsFromStore } from '../getters/getBoqRowsFromStore'

type Props = {
  blockIndex: number
}

export const selectBoqRows =
  ({ blockIndex }: Props) =>
  (state: RootState): Row[] => {
    const boqRows = getBoqRowsFromStore({ blockIndex })
    if (boqRows === undefined) return []

    return boqRows
  }
