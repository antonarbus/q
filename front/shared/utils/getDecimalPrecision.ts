type Props = {
  valueDifference: number
}

// stupid function based on experimentation

export const getDecimalPrecision = ({ valueDifference }: Props): number => {
  const absValDifference = Math.abs(valueDifference)
  if (absValDifference >= 100) return 0
  if (absValDifference >= 10) return 1
  if (absValDifference >= 1) return 2
  if (absValDifference >= 0.1) return 3
  if (absValDifference >= 0.01) return 4
  if (absValDifference >= 0.001) return 5
  if (absValDifference >= 0.0001) return 6
  if (absValDifference >= 0.00001) return 7
  if (absValDifference >= 0.000001) return 8
  if (absValDifference >= 0.0000001) return 9

  return 0
}

/* ChatGPT version

export const getDecimalPrecision = ({ valueDifference }: Props): number => {
  const absValDifference = Math.abs(valueDifference)

  if (absValDifference === 0) return 0

  const precision = Math.floor(Math.log10(1 / absValDifference))
  return Math.max(0, precision)
}

*/
