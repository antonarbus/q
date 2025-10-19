const findAndReplaceStringOutsideHtmlTags = (props: {
  string: string
  searchText: string
  replacementText: string
}): string => {
  const regExpToRemoveGapsBetweenDigits = /(?<=\d)\s+(?=\d)/gu

  const regExpToFindSearchTextOutsideHtmlTags = new RegExp(
    `([^<>]*)(${props.searchText})([^<>]*)`,
    'gu',
  )

  const resultString = props.string
    .replace(regExpToRemoveGapsBetweenDigits, '')
    .replace(
      regExpToFindSearchTextOutsideHtmlTags,
      (match, before, found, after) => {
        return String(before) + props.replacementText + String(after)
      },
    )

  return resultString
}

type Props = {
  string: string
  oldNumber: string | number
  newNumber: string | number
}

export const getStringWithNewFormattedNumber = (props: Props): string => {
  console.log('🚀 ~ props:', props)
  const newNumberFormatted = new Intl.NumberFormat('fr', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  }).format(Number(props.newNumber))

  const htmlWithNewNumber = findAndReplaceStringOutsideHtmlTags({
    string: props.string,
    searchText: String(props.oldNumber),
    replacementText: newNumberFormatted,
  })

  return htmlWithNewNumber
}
