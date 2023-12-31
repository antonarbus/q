type Props = {
  string: string
  oldNumber: string | number
  newNumber: string | number
}

export const getStringWithNewFormattedNumber = ({
  string,
  oldNumber,
  newNumber,
}: Props): string => {
  const searchText = String(oldNumber).replace('.', ',')
  const regExpToSearchTextOutsideHtmlTags = new RegExp(`(?![^<>]*>)${searchText}`, 'g')
  const newNumberFormatted = new Intl.NumberFormat('fr', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 100,
  }).format(Number(newNumber))
  const stringWithoutSpacesBetweenNumber = string.replace(/(?<=\d)\s+(?=\d)/g, '')
  const stringWithCommasBetweenNumbers = stringWithoutSpacesBetweenNumber.replace(/(?<=\d)\.(?=\d)/g, ',')
  const htmlWithNewNumber = stringWithCommasBetweenNumbers.replace(regExpToSearchTextOutsideHtmlTags, newNumberFormatted)
  return htmlWithNewNumber
}
