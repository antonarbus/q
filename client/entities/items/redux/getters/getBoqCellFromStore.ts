import { type Item, type BoqColumnKey, type BoqRowCell } from '@shared/types'
import { getBoqRowFromStore } from './getBoqRowFromStore'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
  state?: Item[]
}

export const getBoqCellFromStore = ({
  itemIndex,
  rowIndex,
  boqColumnKey,
  state,
}: Props): BoqRowCell | undefined => {
  // if we call func from reducer is should use own state which we pass here
  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex, state })
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqColumnKey]
  return boqRowCell
}
