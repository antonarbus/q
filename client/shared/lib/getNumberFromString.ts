type Props = {
  string: string | null
}

export const getNumberFromString = ({ string }: Props): number => {
  if (string === null) return 0
  if (string.trim() === '') return 0

  const stringWithNumbersOnly = string
    .replace(/[^0-9,.]/g, '')
    .replace(/,/g, '.')

  const number = parseFloat(stringWithNumbersOnly)

  return number
}
