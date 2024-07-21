import type { RootState } from '@lib_instances/store'
import type { BoqRow } from '../../types'
import { getBoqRowsFromStore } from '../getters/getBoqRowsFromStore'

type Props = {
  blockIndex: number
}

export const selectBoqRows =
  ({ blockIndex }: Props) =>
  (state: RootState): BoqRow[] => {
    const boqRows = getBoqRowsFromStore({ blockIndex })
    if (boqRows === undefined) return []
    return boqRows
  }
