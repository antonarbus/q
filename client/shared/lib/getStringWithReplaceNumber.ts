type Props = {
  string: string
  oldNumber: string | number
  newNumber: string | number
}

export const getStringWithReplaceNumber = ({
  string,
  oldNumber,
  newNumber,
}: Props): string => {
  const searchText = String(oldNumber)
  const regExpToSearchTextOutsideHtmlTags = new RegExp(`(?![^<>]*>)${searchText}`, 'g')
  const htmlWithNewNumber = string.replace(regExpToSearchTextOutsideHtmlTags, String(newNumber))
  return htmlWithNewNumber
}
