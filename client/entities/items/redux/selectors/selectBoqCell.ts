import { type RootState } from '@libras/store'
import type { BoqColumnKey, BoqRowCell } from '@shared/types'
import { getBoqRowFromStore } from '../getters/getBoqRowFromStore'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectBoqCell =
  ({ itemIndex, rowIndex, boqColumnKey }: Props) =>
    (state: RootState): BoqRowCell | undefined => {
      const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
      if (boqRow === undefined) return undefined
      const boqRowCell = boqRow[boqColumnKey]
      return boqRowCell
    }
