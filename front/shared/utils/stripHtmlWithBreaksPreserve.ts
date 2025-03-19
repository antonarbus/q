import striptags from 'striptags'

/**
 * Strip HTML tags and preserve line breaks between block elements
 * Used to preserve line breaks between block elements in Excel
 */
export const stripHtmlWithBreaksPreserve = (html: string): string => {
  // First replace block elements with line breaks
  const htmlWithBreaks = html
    .replace(/<p[^>]*>/gu, '\n')
    .replace(/<\/p>/gu, '')
    .replace(/<br\s*\/?>/gu, '\n')
    .replace(/<ul>/gu, '\n')
    .replace(/<\/ul>/gu, '')
    .replace(/<li>/gu, '• ')
    .replace(/<\/li>/gu, '\n')
    .replace(/<div[^>]*>/gu, '\n')
    .replace(/<\/div>/gu, '')

  // Then strip remaining tags
  const textWithBreaks = striptags(htmlWithBreaks)

  return textWithBreaks
}
