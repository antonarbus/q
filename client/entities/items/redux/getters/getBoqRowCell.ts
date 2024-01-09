import { type BoqColumnKey, type BoqRowCell } from 'client/shared/types'
import { type ItemsState } from '../itemsSlice'
import { getBoqRow } from './getBoqRow'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
  state?: ItemsState
}

export const getBoqRowCell = ({
  itemIndex,
  rowIndex,
  boqColumnKey,
  state,
}: Props): BoqRowCell | undefined => {
  // if we call func from reducer is should use own state which we pass here
  const boqRow = getBoqRow({ itemIndex, rowIndex, state })
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqColumnKey]
  return boqRowCell
}
