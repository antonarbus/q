export const cleanHtml = (html: string): string => {
  const htmlWithoutContentEditableTag = html.replaceAll('contenteditable="true"', '')
  return htmlWithoutContentEditableTag
}
