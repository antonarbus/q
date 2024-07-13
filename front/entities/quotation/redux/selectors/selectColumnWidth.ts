import { type RootState } from '@lib_instances/store'
import type { BoqColumnKey } from '../../types'
import { getBoqBlockFromStore } from '../getters/getBoqBlockFromStore'

type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectColumnWidth =
  ({ itemIndex, boqColumnKey }: Props) =>
  (state: RootState): number => {
    const boqBlock = getBoqBlockFromStore({ itemIndex })
    if (boqBlock === undefined) return 0
    const width = boqBlock.boq.column[boqColumnKey].width
    return width
  }
