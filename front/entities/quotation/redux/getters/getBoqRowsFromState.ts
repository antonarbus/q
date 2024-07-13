import { type Quotation, type BoqRow } from '../../types'
import { getBoqBlockFromState } from './getBoqBlockFromState'

type Props = {
  itemIndex: number
  state: Quotation
}

export const getBoqRowsFromState = ({
  itemIndex,
  state,
}: Props): BoqRow[] | undefined => {
  const boqBlock = getBoqBlockFromState({ itemIndex, state })
  if (boqBlock === undefined) return
  const boqRows = boqBlock.boq.rows
  return boqRows
}
