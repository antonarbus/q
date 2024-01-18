import { type Item, type BoqColumnKey, type BoqRowCell } from '@shared/types'
import { getBoqRowFromState } from './getBoqRowFromState'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
  state: Item[]
}

export const getBoqCellFromState = ({
  itemIndex,
  rowIndex,
  boqColumnKey,
  state,
}: Props): BoqRowCell | undefined => {
  const boqRow = getBoqRowFromState({ itemIndex, rowIndex, state })
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqColumnKey]
  return boqRowCell
}
