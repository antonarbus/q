import type { BoqColumnKey } from '@back/entity/quotation/schema'
import type { RootState } from '@shared/lib/redux'
import { getBoqBlockFromStoreByIndex } from '../getter/getBoqBlockFromStoreByIndex'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectColumnWidth =
  ({ blockIndex, boqColumnKey }: Props) =>
  (_state: RootState): number => {
    const boqBlock = getBoqBlockFromStoreByIndex({ blockIndex })

    if (boqBlock === undefined) {
      return 0
    }

    const column = boqBlock.boq.column[boqColumnKey]

    return column.width
  }
