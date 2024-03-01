type Props = {
  string: string
  oldNumber: string | number
  newNumber: string | number
}

export const getStringWithNewFormattedNumber = ({ string, oldNumber, newNumber }: Props): string => {
  const newNumberFormatted = new Intl.NumberFormat('fr', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  }).format(Number(newNumber))

  const htmlWithNewNumber = findAndReplaceOutsideHtmlTags({
    string,
    searchText: String(oldNumber),
    replacementText: newNumberFormatted,
  })

  return htmlWithNewNumber
}

function findAndReplaceOutsideHtmlTags({ string, searchText, replacementText }: {
  string: string
  searchText: string
  replacementText: string
}): string {
  const regExpToRemoveGapsBetweenDigits = /(?<=\d)\s+(?=\d)/g
  const regExpToFindSearchTextOutsideHtmlTags = new RegExp(`([^<>]*)(${searchText})([^<>]*)`, 'g')
  const resultString = string
    .replace(regExpToRemoveGapsBetweenDigits, '')
    .replace(regExpToFindSearchTextOutsideHtmlTags, (match, before, found, after) => {
      return before + replacementText + after
    })
  return resultString
}
