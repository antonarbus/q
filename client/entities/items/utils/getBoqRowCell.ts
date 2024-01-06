import { getState } from 'client/shared/clients'
import { type BoqColumnKey, type BoqRowCell, type BoqRow } from 'client/shared/types'
import { type ItemsState } from '../redux/itemsSlice'

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
  // if we call it from reducer is own state is required
  if (state !== undefined) {
    const item = state[itemIndex]
    if (item?.type !== 'boq') return
    const boqRow = item.boq.rows[rowIndex]
    if (boqRow === undefined) return
    const boqRowCell = boqRow[boqColumnKey]
    return boqRowCell
  }

  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return
  const boqRow = item.boq.rows[rowIndex]
  if (boqRow === undefined) return
  const boqRowCell = boqRow[boqColumnKey]
  return boqRowCell
}
