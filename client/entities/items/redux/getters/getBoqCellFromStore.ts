import { type BoqColumnKey, type BoqRowCell } from '@shared/types'
import { type ItemsState } from '../itemsSlice'
import { getBoqRowFromStore } from './getBoqRowFromStore'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
  state?: ItemsState
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
