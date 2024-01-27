import { type RootState } from '@lib_instances/store'
import type { BoqColumnKey, BoqRowCell, BoqRowCellKey } from '../../types'
import { getBoqRowFromStore } from '../getters/getBoqRowFromStore'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const selectBoqCell =
  ({ itemIndex, rowIndex, boqRowCellKey }: Props) =>
    (state: RootState): BoqRowCell | undefined => {
      const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
      if (boqRow === undefined) return undefined
      const boqRowCell = boqRow[boqRowCellKey]
      return boqRowCell
    }
