type Props = {
  string: string | null
}

export const getNumberFromString = (props: Props): number => {
  if (props.string === null) {
    return 0
  }

  if (props.string.trim() === '') {
    return 0
  }

  const stringWithNumbersOnly = props.string
    .replace(/[^-0-9,.]/gu, '')
    .replace(/,/gu, '.')

  const number = parseFloat(stringWithNumbersOnly)
  const isNotANumber = isNaN(number)

  if (isNotANumber === true) {
    return 0
  }

  return number
}
