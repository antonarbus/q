import { type RootState } from '@lib_instances/store'
import type { BoqRow } from '@shared/types'
import { getBoqRowsFromStore } from '../getters/getBoqRowsFromStore'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EqualityFn = (a: any, b: any) => boolean

// re-render the list only if boq row is replaced or new row is added
export const boqRowsShapeEqualityFn: EqualityFn = (prevItems: BoqRow[], currentItems: BoqRow[]): boolean => {
  const isDifferentLength = prevItems.length !== currentItems.length
  if (isDifferentLength) return false
  const idsDoNotMatch = prevItems.some((item: BoqRow, itemIndex: number) => prevItems[itemIndex]?.id !== currentItems[itemIndex]?.id)
  if (idsDoNotMatch) return false
  return true
}

type Props = {
  itemIndex: number
}

export const selectBoqRows = ({ itemIndex }: Props) =>
  (state: RootState): BoqRow[] => {
    const boqRows = getBoqRowsFromStore({ itemIndex })
    if (boqRows === undefined) return []
    return boqRows
  }
