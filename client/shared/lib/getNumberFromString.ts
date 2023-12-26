type Props = {
  string: string | null
}

export const getNumberFromString = ({ string }: Props): number => {
  if (string === null) return 0
  const numbersArray = string.match(/\d/g)
  if (numbersArray === null) return 0
  const numberString = numbersArray.join('')
  const number = Number(numberString)
  return number
}
