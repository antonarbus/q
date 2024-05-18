export const dateFilterComparator = (filterLocalDateAtMidnight: Date, cellValue: Date): number => {
  const filterDateString = filterLocalDateAtMidnight.toDateString()
  const cellDateString = cellValue.toDateString()

  if (filterDateString === cellDateString) return 0
  if (cellValue < filterLocalDateAtMidnight) return -1
  if (cellValue > filterLocalDateAtMidnight) return 1
  return 0
}
