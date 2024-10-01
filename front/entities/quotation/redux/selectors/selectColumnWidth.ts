import type { RootState } from '@lib_instances/store'
import { getBoqBlockFromStore } from '../getters/getBoqBlockFromStore'
import type { BoqColumnKey } from '@entities/quotation/consts/boqColumnKey'

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
