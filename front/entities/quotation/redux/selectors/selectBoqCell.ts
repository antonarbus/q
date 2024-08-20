import type { RootState } from '@lib_instances/store'
import type { RowCell, RowCellKey } from '../../types'
import { getBoqRowFromStore } from '../getters/getBoqRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: RowCellKey
}

export const selectBoqCell =
  ({ blockIndex, rowIndex, boqRowCellKey }: Props) =>
  (state: RootState): RowCell | undefined => {
    const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })
    if (boqRow === undefined) return undefined
    const boqRowCell = boqRow[boqRowCellKey]
    return boqRowCell
  }
