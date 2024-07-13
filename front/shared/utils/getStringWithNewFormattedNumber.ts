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

// eslint-disable-next-line func-style
function findAndReplaceStringOutsideHtmlTags({
  string,
  searchText,
  replacementText,
}: {
  string: string
  searchText: string
  replacementText: string
}): string {
  // eslint-disable-next-line require-unicode-regexp
  const regExpToRemoveGapsBetweenDigits = /(?<=\d)\s+(?=\d)/g
  // eslint-disable-next-line require-unicode-regexp
  const regExpToFindSearchTextOutsideHtmlTags = new RegExp(
    `([^<>]*)(${searchText})([^<>]*)`,
    'g',
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
