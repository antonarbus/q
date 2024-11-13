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
  const isDifferentLength = prev.length !== current.length

  if (isDifferentLength) {
    return false
  }

  const idsDoNotMatch = prev.some(
    (item: Obj, index: number) => prev[index]?.id !== current[index]?.id,
  )

  if (idsDoNotMatch) {
    return false
  }

  return true
}
