import type { TItem } from 'client/entities/items'

export const cleanItem = (item: TItem): TItem => {
  const modifiableItem = structuredClone(item)
  modifiableItem.msg = ''
  modifiableItem.previewHtml = ''
  return modifiableItem
}

export const cleanHtml = (html: string): string => {
  const htmlWithoutContentEditableTag = html.replaceAll('contenteditable="true"', '')
  const refRegExp = /ref=".*?"/g // ag-grid uses string refs and react does not like it
  const itemHtmlCleaned = htmlWithoutContentEditableTag.replace(refRegExp, '')
  return itemHtmlCleaned
}
