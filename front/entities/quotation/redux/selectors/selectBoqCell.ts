import { type RootState } from '@lib_instances/store'
import type { BoqRowCell, BoqRowCellKey } from '../../types'
import { getBoqRowByIndexFromStore } from '../getters/getBoqRowByIndexFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const selectBoqCell =
  ({ blockIndex, rowIndex, boqRowCellKey }: Props) =>
  (state: RootState): BoqRowCell | undefined => {
    const boqRow = getBoqRowByIndexFromStore({ blockIndex, rowIndex })
    if (boqRow === undefined) return undefined
    const boqRowCell = boqRow[boqRowCellKey]
    return boqRowCell
  }
