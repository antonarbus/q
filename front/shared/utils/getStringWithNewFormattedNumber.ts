const findAndReplaceStringOutsideHtmlTags = ({
  string,
  searchText,
  replacementText,
}: {
  string: string
  searchText: string
  replacementText: string
}): string => {
  const regExpToRemoveGapsBetweenDigits = /(?<=\d)\s+(?=\d)/gu
  const regExpToFindSearchTextOutsideHtmlTags = new RegExp(
    `([^<>]*)(${searchText})([^<>]*)`,
    'gu',
  )
  const resultString = string
    .replace(regExpToRemoveGapsBetweenDigits, '')
    .replace(
      regExpToFindSearchTextOutsideHtmlTags,
      (match, before, found, after) => {
        return before + replacementText + after
      },
    )
  return resultString
}

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
  const newNumberFormatted = new Intl.NumberFormat('fr', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  }).format(Number(newNumber))

  const htmlWithNewNumber = findAndReplaceStringOutsideHtmlTags({
    string,
    searchText: String(oldNumber),
    replacementText: newNumberFormatted,
  })

  return htmlWithNewNumber
}
