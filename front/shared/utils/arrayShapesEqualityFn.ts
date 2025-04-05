import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EqualityFn = (a: any, b: any) => boolean

type Obj = {
  [x: string]: unknown
  id: string
}

// re-render the list only if item is replaced or new item is added
export const arrayShapesEqualityFn: EqualityFn = (
  prev: Obj[],
  current: Obj[],
): boolean => {
  // remove the bookmark block item which is placed at pos 1000
  // after slice() there going to be empty items, filter them out
  // otherwise blocks will be re-rendered with visual distortion on bookmark modal open
  const prevSliced = prev.slice(0, BOOKMARK_POS_AT_BLOCKS - 1).filter(Boolean)

  const currentSliced = current
    .slice(0, BOOKMARK_POS_AT_BLOCKS - 1)
    .filter(Boolean)

  const isDifferentLength = prevSliced.length !== currentSliced.length

  if (isDifferentLength) {
    return false
  }

  const idsDoNotMatch = prevSliced.some(
    (item: Obj, index: number) =>
      prevSliced[index]?.id !== currentSliced[index]?.id,
  )

  if (idsDoNotMatch) {
    return false
  }

  return true
}
