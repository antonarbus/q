import striptags from 'striptags'

/**
 * Strip HTML tags and preserve line breaks between block elements
 * Used to preserve line breaks between block elements in Excel
 */
export const stripHtmlWithBreaksPreserve = (html: string): string => {
  // First replace block elements with line breaks
  const htmlWithBreaks = html
    .replaceAll(/<p[^>]*>/gu, '\n')
    .replaceAll('</p>', '')
    .replaceAll(/<br\s*\/?>/gu, '\n')
    .replaceAll('<ul>', '\n')
    .replaceAll('</ul>', '')
    .replaceAll('<li>', '• ')
    .replaceAll('</li>', '\n')
    .replaceAll(/<div[^>]*>/gu, '\n')
    .replaceAll('</div>', '')

  // Then strip remaining tags
  const textWithBreaks = striptags(htmlWithBreaks)

  return textWithBreaks
}
