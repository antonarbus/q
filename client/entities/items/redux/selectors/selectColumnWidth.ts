import type { BoqColWidth, BoqColumnKey, RootState } from 'client/shared/types'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'

type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectColumnWidth =
  ({ itemIndex, boqColumnKey }: Props) =>
    (state: RootState): BoqColWidth => {
      const boqItem = getBoqItemFromStore({ itemIndex })
      if (boqItem === undefined) return undefined
      const width = boqItem.boq.column[boqColumnKey].width
      return width
    }
