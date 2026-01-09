import type { BoqColumnKey } from '@back/entity/quotation/schema'
import type { RootState } from '@shared/lib/redux'
import { getBoqBlockFromStore } from '../getter/getBoqBlockFromStore'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectColumnWidth =
  ({ blockIndex, boqColumnKey }: Props) =>
  (_state: RootState): number => {
    const boqBlock = getBoqBlockFromStore({ blockIndex })

    if (boqBlock === undefined) {
      return 0
    }

    const column = boqBlock.boq.column[boqColumnKey]

    return column.width
  }
