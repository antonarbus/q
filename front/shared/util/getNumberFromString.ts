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

  const stringWithNumbersOnly = props.string.replaceAll(/[^-0-9,.]/gu, '').replaceAll(',', '.')

  const number = Number.parseFloat(stringWithNumbersOnly)
  const isNotANumber = Number.isNaN(number)

  if (isNotANumber === true) {
    return 0
  }

  return number
}
