import { type RootState } from '@lib_instances/store'
import type { BoqColumnKey } from '@shared/types'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'

type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectColumnWidth =
  ({ itemIndex, boqColumnKey }: Props) =>
    (state: RootState): number => {
      const boqItem = getBoqItemFromStore({ itemIndex })
      if (boqItem === undefined) return 0
      const width = boqItem.boq.column[boqColumnKey].width
      return width
    }
