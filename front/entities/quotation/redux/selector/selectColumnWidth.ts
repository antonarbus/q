import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'
import type { RootState } from '@shared/lib/redux'
import { getBoqBlockFromStore } from '../getter/getBoqBlockFromStore'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectColumnWidth =
  ({ blockIndex, boqColumnKey }: Props) =>
  (state: RootState): number => {
    const boqBlock = getBoqBlockFromStore({ blockIndex })

    if (boqBlock === undefined) {
      return 0
    }

    const { width } = boqBlock.boq.column[boqColumnKey]

    return width
  }
