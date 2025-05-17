type Props = {
  string: string | null
}

export const getNumberFromString = ({ string }: Props): number => {
  if (string === null) {
    return 0
  }

  if (string.trim() === '') {
    return 0
  }

  const stringWithNumbersOnly = string
    .replace(/[^-0-9,.]/gu, '')
    .replace(/,/gu, '.')

  const number = parseFloat(stringWithNumbersOnly)
  const isNotANumber = isNaN(number)

  if (isNotANumber) {
    return 0
  }

  return number
}
