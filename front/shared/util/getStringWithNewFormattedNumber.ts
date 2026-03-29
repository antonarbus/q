type Props = {
  string: string
  newNumber: string | number
}

/**
 * Replaces the first decimal number in an HTML string with a new formatted number.
 *
 * This function is useful when you need to update a number displayed in HTML content,
 * but the stored value and displayed value might be formatted differently.
 *
 * @example
 * // HTML contains "140" but needs to be updated to "1 230"
 * getStringWithNewFormattedNumber({
 *   string: '<p>140 <span>USD</span></p>',
 *   newNumber: 1230
 * })
 * // Returns: '<p>1 230 <span>USD</span></p>'
 */
export const getStringWithNewFormattedNumber = (props: Props): string => {
  // Format the new number using French locale (space as thousands separator)
  const newNumberFormatted = new Intl.NumberFormat('fr', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  }).format(Number(props.newNumber))

  // Remove any spaces/narrow-no-break-spaces between digits (e.g., "1 230" or "1\u202f230" becomes "1230")
  // This normalizes the HTML before searching for the number
  const normalizedHtml = props.string.replace(/(?<=\d)[\s\u202f]+(?=\d)/gu, '')

  // Pattern to match any decimal number (e.g., "123", "123.45", "123,45")
  // Matches: digits, optionally followed by (comma or period) and more digits
  const decimalNumberPattern = /\d+(?:[,.]\d+)?/u

  // Replace the first decimal number found with the new formatted number
  const htmlWithNewNumber = normalizedHtml.replace(decimalNumberPattern, newNumberFormatted)

  return htmlWithNewNumber
}
