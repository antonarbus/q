import type { RootState } from '@lib_instances/store'
import type { BoqColumnKey } from '../../types'
import { getBoqBlockFromStore } from '../getters/getBoqBlockFromStore'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectColumnWidth =
  ({ blockIndex, boqColumnKey }: Props) =>
  (state: RootState): number => {
    const boqBlock = getBoqBlockFromStore({ blockIndex })
    if (boqBlock === undefined) return 0
    const width = boqBlock.boq.column[boqColumnKey].width
    return width
  }
