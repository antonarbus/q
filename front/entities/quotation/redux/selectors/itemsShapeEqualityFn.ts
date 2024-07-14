import type { Item } from '../../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EqualityFn = (a: any, b: any) => boolean

// re-render the list only if item is replaced or new item is added
export const blocksShapeEqualityFn: EqualityFn = (
  prevItems: Item[],
  currentItems: Item[],
): boolean => {
  const isDifferentLength = prevItems.length !== currentItems.length
  if (isDifferentLength) return false
  const idsDoNotMatch = prevItems.some(
    (item: Item, blockIndex: number) =>
      prevItems[blockIndex]?.id !== currentItems[blockIndex]?.id,
  )
  if (idsDoNotMatch) return false
  return true
}
