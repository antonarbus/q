import type { BoqRow, Item } from 'client/shared/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EqualityFn = (a: any, b: any) => boolean

// re-render the list only if boq row is replaced or new row is added
export const boqRowsShapeEqualityFn: EqualityFn = (prevItems: BoqRow[], currentItems: BoqRow[]): boolean => {
  const isDifferentLength = prevItems.length !== currentItems.length
  if (isDifferentLength) return false
  const idsDoNotMatch = prevItems.some((item: BoqRow, index: number) => prevItems[index]?.id !== currentItems[index]?.id)
  if (idsDoNotMatch) return false
  return true
}