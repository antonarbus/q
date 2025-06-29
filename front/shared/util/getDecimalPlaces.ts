export const getDecimalPlaces = (num: number): number => {
  const parts = num.toString().split('.')

  return parts[1]?.length ?? 0
}
