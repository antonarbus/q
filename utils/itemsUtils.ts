import type { TItem } from 'client/entities/items'

export function cleanItem(item: TItem): TItem {
  const modifiableItem = structuredClone(item)
  if (modifiableItem === undefined) return item
  modifiableItem.msg = ''
  modifiableItem.previewHtml = ''
  return modifiableItem
}

export function cleanHtml(html: string): string {
  const htmlWithoutContentEditableTag = html.replaceAll('contenteditable="true"', '')
  const refRegExp = /ref=".*?"/g // ag-grid uses string refs and react does not like it
  const itemHtmlCleaned = htmlWithoutContentEditableTag.replace(refRegExp, '')
  return itemHtmlCleaned
}
