import type { BoqColumnKey, BoqRowCellPin, RootState } from 'client/shared/types'
import { getBoqRow } from '../getters/getBoqRow'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectBoqRowCellPin =
  ({ itemIndex, rowIndex, boqColumnKey }: Props) =>
    (state: RootState): BoqRowCellPin | undefined => {
      const boqRow = getBoqRow({ itemIndex, rowIndex })
      if (boqRow === undefined) return
      const boqRowCellPin = boqRow[boqColumnKey].pin
      return boqRowCellPin
    }
