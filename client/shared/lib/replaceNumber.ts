type Props = {
  html: string
  oldNumber: string | number
  newNumber: string | number
}

export const replaceNumber = ({
  html,
  oldNumber,
  newNumber,
}: Props): string => {
  const searchText = String(oldNumber)
  const regExpOutsideHtmlTags = new RegExp(`(?![^<>]*>)${searchText}`, 'g')
  const htmlWithNewNumber = html.replace(regExpOutsideHtmlTags, String(newNumber))
  return htmlWithNewNumber
}
