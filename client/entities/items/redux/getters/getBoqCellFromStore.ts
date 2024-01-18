import { type BoqColumnKey, type BoqRowCell } from '@shared/types'
import { getBoqRowFromStore } from './getBoqRowFromStore'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqCellFromStore = ({
  itemIndex,
  rowIndex,
  boqColumnKey,
}: Props): BoqRowCell | undefined => {
  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqColumnKey]
  return boqRowCell
}
