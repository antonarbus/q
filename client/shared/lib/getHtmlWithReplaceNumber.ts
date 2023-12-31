type Props = {
  html: string
  oldNumber: string | number
  newNumber: string | number
}

export const getHtmlWithReplaceNumber = ({
  html,
  oldNumber,
  newNumber,
}: Props): string => {
  const searchText = String(oldNumber)
  const regExpOutsideHtmlTags = new RegExp(`(?![^<>]*>)${searchText}`, 'g')
  const htmlWithNewNumber = html.replace(regExpOutsideHtmlTags, String(newNumber))

  // // do the same thing, but for the number with comma
  // const searchText2 = String(oldNumber).replace(',', '.')
  // const regExpOutsideHtmlTags2 = new RegExp(`(?![^<>]*>)${searchText2}`, 'g')
  // const htmlWithNewNumber2 = htmlWithNewNumber.replace(regExpOutsideHtmlTags2, String(newNumber))

  return htmlWithNewNumber
}
